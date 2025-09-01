// app/tracking/[id]/page.jsx (Example for Next.js App Router)

import ClientTrackingDetails from "@/components/features/tracking/ClientTrackingDetails";
import MapWrapper from "@/components/features/tracking/MapWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MailCheck, Search } from "lucide-react";
import { Suspense } from "react";

async function getTrackingData(trackingId: number) {
  return {
    trackingNumber: trackingId,
    deliveryDate: "16 აპრილი, 2026",
    orderId: "Order - 32242",
    origin: "შტუტგარტი, გერმანია 1183",
    destination: "თბილისი, საქართველო 1183",
    currentStepIndex: 1, // This could be determined by the latest tracking event
    timeEstimates: {
      initialTime: "8 დღე, 7 საათი",
      departureTime: "17 მაისი, 15:17PM",
      arrivalTime: "2 ივნისი, 14:22PM",
    },
    trackingHistory: [
      {
        status: "გაგზავნისთვის გამზადებულია",
        timestamp: "10 ივნისი 2025 15:30 PM",
        location: "ბაზაში DE15253",
      },
      {
        status: "მზადაა გასაგზავნად",
        timestamp: "10 ივნისი 2025 15:30 PM",
        location: "ბაზაში DE15253",
      },
      {
        status: "გაჰყოფილა დასახლება",
        timestamp: "10 ივნისი 2025 15:30 PM",
        location: "ბაზაში DE15253",
      },
      {
        status: "შეკვეთა აღებულია",
        timestamp: "10 ივნისი 2025 15:30 PM",
        location: "ბაზაში DE15253",
      },
    ],
  };
}

type TrackingPage = {
  params: Promise<{ lang: Lang }>;
  id: Promise<string>;
};
const TrackingPage = async () => {
  const trackingData = await getTrackingData(1);
  const tbilisiCoordinates = { lat: 41.715137, lng: 44.827095 };
  const markerLocation = { lat: 41.7092, lng: 44.795 };

  return (
    <Card className="container mx-auto shadow-lg mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
      <CardHeader className="flex flex-col sm:flex-row gap-3 sm:gap-4 py-4 sm:py-6">
        <Input
          placeholder="Search anything"
          className="h-10 sm:h-12 flex-grow"
        />
        <Button className="min-w-[120px] sm:min-w-[135px] h-10 sm:h-12 bg-space-blue-light flex items-center justify-center">
          Search
          <Search className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0 py-4 sm:py-6 flex flex-col lg:flex-row justify-between lg:min-h-[600px]">
        {/* Main Tracking Details Section */}
        <div className="flex-1 lg:pr-10 mb-8 lg:mb-0">
          {/* Tracking Number and Notifications */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
              ტრეკინგის ნომერი
              <br />
              <span className="text-2xl sm:text-3xl font-bold text-blue-700">
                {trackingData.trackingNumber}
              </span>
            </h2>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-blue-700 border-blue-700 mt-2 sm:mt-0">
              <MailCheck className="mr-2 h-4 w-4" />
              მიიღე შეტყობინებები
            </button>
          </div>

          {/* Delivery Date and Order ID */}
          <div className="mb-6 text-gray-600 text-sm sm:text-base">
            <p>
              ჩასაბარებელი თარიღი:{" "}
              <span className="font-medium">{trackingData.deliveryDate}</span>
            </p>
            <p>
              შეკვეთის ID:{" "}
              <span className="font-medium">{trackingData.orderId}</span>
            </p>
          </div>

          {/* Location Section */}
          <div className="mb-6 space-y-2 border-2 rounded-md overflow-hidden">
            <div className="bg-background p-4 sm:p-5">
              <div className="flex items-start text-gray-700 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm sm:text-base">
                  გამოსვლის ადგილი:{" "}
                  <span className="font-medium">{trackingData.origin}</span>
                </p>
              </div>
              <div className="w-0.5 h-6 ml-[3px]"></div>
              <div className="flex items-start text-gray-700 mt-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm sm:text-base">
                  დანიშნულების ადგილი:{" "}
                  <span className="font-medium">
                    {trackingData.destination}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <Suspense>
                <ClientTrackingDetails
                  currentActiveStepIndex={trackingData.currentStepIndex}
                />
              </Suspense>

            </div>
          </div>

          {/* Time Estimates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-b py-4 sm:py-6">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">საწყისი დრო</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {trackingData.timeEstimates.initialTime}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">გამოსვლის დრო</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {trackingData.timeEstimates.departureTime}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">ჩასვლის დრო</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {trackingData.timeEstimates.arrivalTime}
              </p>
            </div>
          </div>

          {/* Tracking History */}
          <div className="space-y-4 pt-4 sm:pt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              ტრეკინგის ისტორია
            </h3>
            {trackingData.trackingHistory.map(
              (
                event: { status: string; timestamp: string; location: string },
                index: number
              ) => (
                <div key={index} className="flex items-start">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    {index < trackingData.trackingHistory.length - 1 && (
                      <div className="w-0.5 h-6 bg-gray-300 mt-1"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      {event.status} | {event.timestamp}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 text-xs sm:text-sm mt-1"
                    >
                      {event.location}
                    </Badge>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="lg:flex-1 rounded-md lg:h-auto w-full h-[600px]">
          <MapWrapper
            center={tbilisiCoordinates}
            zoom={12}
            markerPosition={markerLocation}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingPage;
