export default function Itinerary({ itinerary }) {


return (

<section className="mt-10">


<h2 className="text-3xl font-bold mb-5">
AI Itinerary
</h2>


{
itinerary?.map((day,index)=>(

<div 
key={index}
className="bg-white shadow rounded-xl p-5 mb-4"
>

<h3 className="text-xl font-bold">
Day {day.day}
</h3>


<p>
{day.notes}
</p>


</div>

))
}


</section>

);

}