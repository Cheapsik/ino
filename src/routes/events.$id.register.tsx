import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { RegisterEventSummary } from "@/components/register/RegisterEventSummary";
import { RegisterForm, type RegisterFormValues } from "@/components/register/RegisterForm";
import { RegisterSuccess, type RegisterSuccessData } from "@/components/register/RegisterSuccess";
import { toast } from "@/components/ui/toast";
import { events } from "@/data/events";

const categorySchema = z.enum(["Low", "Medium", "High"]);

const searchSchema = z.object({
  category: categorySchema.optional(),
});

type RegisterSearchValues = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/events/$id/register")({
  validateSearch: searchSchema,
  beforeLoad: ({ params }) => {
    const event = events.find((item) => item.id === params.id);
    if (!event || event.status !== "open") {
      throw redirect({ to: "/events/$id", params: { id: params.id } });
    }
  },
  component: EventRegisterPage,
});

function EventRegisterPage() {
  const { id } = Route.useParams();
  const search = Route.useSearch() as RegisterSearchValues;
  const event = events.find((item) => item.id === id);
  const [submitSuccess, setSubmitSuccess] = useState<RegisterSuccessData | null>(null);
  const preselectedCategory = useMemo(() => {
    if (!event || event.status !== "open") {
      return undefined;
    }

    if (!search.category) {
      return undefined;
    }

    const selected = event.categories.find((category) => category.name === search.category);
    if (!selected) {
      return undefined;
    }

    const spotsLeft = selected.spotsTotal - selected.spotsTaken;
    return spotsLeft > 0 ? selected.name : undefined;
  }, [event, search.category]);

  const onSubmit = async (values: RegisterFormValues) => {
    if (!event || event.status !== "open") {
      return;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 1500));

    const payload = {
      eventId: event.id,
      eventName: event.title,
      email: values.email.trim(),
      patrolPhone: values.patrolPhone.trim(),
      teamName: values.teamName.trim(),
      teamMembers: values.teamMembers.trim(),
      category: values.category,
    };

    console.log("registration_submitted", payload);
    toast.success("Zgłoszenie zostało przyjęte.");
    setSubmitSuccess({
      email: payload.email,
      patrolPhone: payload.patrolPhone,
      teamName: payload.teamName,
      teamMembers: payload.teamMembers,
      category: payload.category,
    });
  };

  if (!event || event.status !== "open") {
    return null;
  }

  return (
    <div className="min-h-dvh bg-black/45">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 pt-6">
        <Link
          to="/events/$id"
          params={{ id: event.id }}
          className="inline-flex text-sm text-white/70 transition-colors hover:text-white"
        >
          ← Szczegóły biegu
        </Link>

        <div className="mx-auto mt-3 w-full max-w-lg pb-10">
          <RegisterEventSummary event={event} />

          <section className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)]">
            {!submitSuccess ? (
              <RegisterForm
                event={event}
                preselectedCategory={preselectedCategory}
                onSubmit={onSubmit}
              />
            ) : (
              <RegisterSuccess event={event} successData={submitSuccess} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
