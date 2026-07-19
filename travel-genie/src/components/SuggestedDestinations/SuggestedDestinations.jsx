import destinations from "../../data/destinations";
import DestinationCard from "../DestinationCard/DestinationCard";


export default function SuggestedDestinations(){

return (

<section className="
py-20
bg-stone-50
dark:bg-[#0F172A]
">


<div className="
max-w-7xl
mx-auto
px-6
">


<h2 className="
text-center
text-4xl
font-bold
dark:text-white
">

Popular Destinations

</h2>


<p className="
mt-4
mb-12
text-center
text-gray-600
dark:text-gray-300
">

Discover amazing places and let TravelGenie help you plan your journey.

</p>


<div className="
grid
gap-8
md:grid-cols-2
lg:grid-cols-3
">


{
destinations.map((destination)=>(
<DestinationCard
key={destination.id}
destination={destination}
/>
))
}


</div>


</div>


</section>

);

}