import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">
          Signed-in superadmin area.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {ADMIN_NAV_ITEMS.filter((item) => item.href !== "/dashboard").map(
          (item) => {
            const Icon = item.icon
            return (
              <Card key={item.href}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="size-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{item.label}</CardTitle>
                  </div>
                  {item.description ? (
                    <CardDescription>{item.description}</CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="w-full sm:w-auto">
                    <Link href={item.href}>
                      Open
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          },
        )}
      </div>
    </div>
  )
}
