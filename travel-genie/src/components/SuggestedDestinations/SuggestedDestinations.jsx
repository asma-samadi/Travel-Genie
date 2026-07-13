import destinations from "../../data/destinations";
import DestinationCard from "../DestinationCard/DestinationCard";


export default function SuggestedDestinations(){

  return (

    <section className="py-16 px-5">

      <h2 className="text-3xl font-bold text-center mb-10">
        Suggested Destinations
      </h2>


      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {
          destinations.map((destination)=>(
            
            <DestinationCard
              key={destination.id}
              destination={destination}
            />

          ))
        }

      </div>


    </section>

  );

}
