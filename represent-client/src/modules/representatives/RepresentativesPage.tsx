import { DefaultLayout } from "@/components/layouts/DefaultLayout"
import { Grid } from "@material-ui/core"
import { Member } from "./Member.type"
import { MemberCard } from "@/modules/representatives/MemberCard"
import React from "react"
import { getMembers } from "@/modules/representatives/members.api"
import { useQuery } from "react-query"
import { useUserStore } from "@/stores/user/useUserStore"

export const RepresentativesPage = () => {
  const { settings } = useUserStore()
  const { data, error } = useQuery<Member[], Error>([`members`, settings.state, settings.district], () =>
    getMembers({
      state: settings.state,
      district: settings.district,
    })
  )

  return (
    <DefaultLayout title="Representatives">
      <section className="pr-3 pl-3">
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="column" spacing={2}>
            {data?.map((r: Member) => (
              <Grid item container xs={12} key={r.id}>
                <MemberCard {...r} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </section>
    </DefaultLayout>
  )
}
