import { Card, CardContent } from "@/components/ui/card"

const CourierLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return <div className="container">
        <Card className="p-0 m-0 py-2">
            <CardContent className="p-0">
                {children}
            </CardContent>
        </Card>
    </div>
}

export default CourierLayout
