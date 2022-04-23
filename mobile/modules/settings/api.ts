import supabase from "../../lib/supabaseClient"

type IFeedbackProps = {
  text: string
  type: "bug" | "feature"
  metadata: object
}

export async function createFeedback(feedback: IFeedbackProps) {
  const { data, error } = await supabase.from("feedback").insert([{ ...feedback }], { returning: "minimal" })

  return { data, error }
}
