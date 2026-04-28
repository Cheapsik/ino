import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { EventLevel, OrienteeringEvent } from "@/data/events";

const categorySchema = z.enum(["Low", "Medium", "High"], {
  required_error: "Wybierz poziom trudności",
  invalid_type_error: "Wybierz poziom trudności",
});

const registerSchema = z.object({
  email: z.string().trim().email("Nieprawidłowy adres e-mail"),
  patrolPhone: z
    .string()
    .trim()
    .min(9, "Nieprawidłowy numer telefonu")
    .refine((value) => /^(\+48)?\s?\d{3}\s?\d{3}\s?\d{3}$/.test(value.replace(/-/g, "")), {
      message: "Nieprawidłowy numer telefonu",
    }),
  teamName: z.string().trim().min(3, "Podaj nazwę patrolu"),
  teamMembers: z.string().trim().min(3, "Podaj skład patrolu"),
  category: categorySchema,
  terms: z.boolean().refine((value) => value, {
    message: "Musisz zaakceptować regulamin",
  }),
  privacyPolicy: z.boolean().refine((value) => value, {
    message: "Musisz zaakceptować politykę prywatności",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  event: OrienteeringEvent;
  preselectedCategory?: EventLevel;
  onSubmit: (values: RegisterFormValues) => Promise<void>;
  onCategoryChange: (value?: EventLevel) => void;
};

const categoryOrder: EventLevel[] = ["Low", "Medium", "High"];

const categoryToneClass: Record<EventLevel, { idle: string; active: string }> = {
  Low: {
    idle: "border-emerald-400/20 bg-emerald-400/5 text-emerald-200",
    active:
      "border-emerald-300 bg-emerald-400/15 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.25)]",
  },
  Medium: {
    idle: "border-yellow-400/20 bg-yellow-400/5 text-yellow-200",
    active:
      "border-yellow-300 bg-yellow-400/15 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.25)]",
  },
  High: {
    idle: "border-red-400/20 bg-red-400/5 text-red-200",
    active: "border-red-300 bg-red-400/15 text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.25)]",
  },
};

function ErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="flex items-center gap-1.5 text-xs text-[#FF6B00]">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function RegisterForm({
  event,
  preselectedCategory,
  onSubmit,
  onCategoryChange,
}: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      patrolPhone: "",
      teamName: "",
      teamMembers: "",
      category: preselectedCategory,
      terms: false,
      privacyPolicy: false,
    },
  });

  const selectedCategory = watch("category");
  const acceptedTerms = watch("terms");
  const acceptedPrivacy = watch("privacyPolicy");

  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [onCategoryChange, selectedCategory]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Zgłoszenie do biegu</h1>
        <p className="mt-1 text-sm text-[#A3B5A8]">Uzupełnij dane i wybierz kategorię.</p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold tracking-widest text-[#A3B5A8] uppercase"
        >
          ADRES EMAIL
        </label>
        <input
          id="email"
          type="email"
          placeholder="email@gmail.com"
          className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-4 text-white placeholder:text-[#657A6B] transition-colors focus:border-[#00FF66] focus:outline-none focus:ring-0"
          {...register("email")}
        />
        <ErrorText message={errors.email?.message} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="patrolPhone"
          className="text-xs font-semibold tracking-widest text-[#A3B5A8] uppercase"
        >
          TELEFON DO PATROLOWEGO
        </label>
        <input
          id="patrolPhone"
          type="tel"
          placeholder="+48 000 000 000"
          className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-4 text-white placeholder:text-[#657A6B] transition-colors focus:border-[#00FF66] focus:outline-none focus:ring-0"
          {...register("patrolPhone")}
        />
        <ErrorText message={errors.patrolPhone?.message} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="teamName"
          className="text-xs font-semibold tracking-widest text-[#A3B5A8] uppercase"
        >
          NAZWA PATROLU
        </label>
        <input
          id="teamName"
          type="text"
          placeholder="Nocne Azymuty"
          className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-4 text-white placeholder:text-[#657A6B] transition-colors focus:border-[#00FF66] focus:outline-none focus:ring-0"
          {...register("teamName")}
        />
        <ErrorText message={errors.teamName?.message} />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="teamMembers"
          className="text-xs font-semibold tracking-widest text-[#A3B5A8] uppercase"
        >
          SKŁAD PATROLU
        </label>
        <textarea
          id="teamMembers"
          rows={4}
          placeholder="Np. Jan Kowalski, Anna Nowak"
          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-[#657A6B] transition-colors focus:border-[#00FF66] focus:outline-none focus:ring-0"
          {...register("teamMembers")}
        />
        <ErrorText message={errors.teamMembers?.message} />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-widest text-[#A3B5A8] uppercase">
          POZIOM TRUDNOŚCI
        </p>
        <div className="grid grid-cols-3 gap-3">
          {categoryOrder.map((level) => {
            const categoryData = event.categories.find((category) => category.name === level);
            const spotsLeft = categoryData ? categoryData.spotsTotal - categoryData.spotsTaken : 0;
            const isDisabled = spotsLeft <= 0;
            const isActive = selectedCategory === level;
            const toneClass = categoryToneClass[level];

            return (
              <button
                key={level}
                type="button"
                disabled={isDisabled}
                onClick={() =>
                  setValue("category", level, {
                    shouldValidate: true,
                    shouldTouch: true,
                    shouldDirty: true,
                  })
                }
                className={`rounded-2xl border p-4 text-center transition-all ${
                  isDisabled
                    ? "cursor-not-allowed border-white/10 bg-white/5 text-white/30"
                    : `cursor-pointer ${toneClass.idle}`
                } ${isActive && !isDisabled ? toneClass.active : ""}`}
              >
                <p className="text-lg font-bold">{level}</p>
                <p className="mt-1 text-xs text-[#A3B5A8]">
                  {isDisabled ? "Brak miejsc" : `${spotsLeft} miejsc`}
                </p>
              </button>
            );
          })}
        </div>
        <ErrorText message={errors.category?.message} />
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() =>
            setValue("terms", !acceptedTerms, {
              shouldValidate: true,
              shouldTouch: true,
              shouldDirty: true,
            })
          }
          className="flex items-start gap-3 text-left"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
              acceptedTerms ? "border-[#00FF66] bg-[#00FF66]" : "border-white/20 bg-transparent"
            }`}
          >
            {acceptedTerms ? <Check className="h-3.5 w-3.5 text-white" /> : null}
          </span>
          <span className="text-sm text-[#A3B5A8]">
            Akceptuję{" "}
            <a
              href="#"
              className="text-[#00FF66] underline decoration-[#00FF66]/40 underline-offset-2"
            >
              regulamin
            </a>{" "}
            wydarzenia.
          </span>
        </button>
        <ErrorText message={errors.terms?.message} />

        <button
          type="button"
          onClick={() =>
            setValue("privacyPolicy", !acceptedPrivacy, {
              shouldValidate: true,
              shouldTouch: true,
              shouldDirty: true,
            })
          }
          className="flex items-start gap-3 text-left"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
              acceptedPrivacy ? "border-[#00FF66] bg-[#00FF66]" : "border-white/20 bg-transparent"
            }`}
          >
            {acceptedPrivacy ? <Check className="h-3.5 w-3.5 text-white" /> : null}
          </span>
          <span className="text-sm text-[#A3B5A8]">
            Akceptuję{" "}
            <a
              href="#"
              className="text-[#00FF66] underline decoration-[#00FF66]/40 underline-offset-2"
            >
              politykę prywatności
            </a>
            .
          </span>
        </button>
        <ErrorText message={errors.privacyPolicy?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#00FF66] text-base font-bold text-[#0B110D] transition-all hover:brightness-105 hover:shadow-[0_0_24px_rgba(0,255,102,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {isSubmitting ? "Wysyłanie..." : "Potwierdź zgłoszenie →"}
      </button>
    </form>
  );
}

export type { RegisterFormValues };
