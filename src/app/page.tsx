import MyCarousel from "@/components/Carousel/MyCarousel";
import CardEvents from "@/components/Events/CardEvents";
import { eventPreLoad } from "@/helpers/eventPreLoad";
import Link from "next/link";

export default function Home() {
  const events = eventPreLoad;
  const eventsToShow = events.slice(0, 3);
  return (
    <>
      <MyCarousel />
      <section className="grid py-20 px-5 md:px-0 bg-white">
        <h1 className="text-3xl font-medium text-center mb-7">
          TAMBIEN TE PUEDE INTERESAR
        </h1>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 max-w-6xl mx-auto">
          <div className="col-span-1 items-center">
            <Link
              href="/concerts"
              className="relative block box-content h-full z-[1] group"
              style={{
                backgroundImage: `url(${eventsToShow[0].imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
              <div className="absolute left-0 bottom-12 z-[2] mr-2">
                <p className="inline bg-red-600 text-white decoration-clone text-center px-3 text-3xl leading-snug">
                  PRÓXIMOS EVENTOS
                </p>
                <p className="text-white text-sm p-2">VER TODO</p>
              </div>
            </Link>
          </div>
          {eventsToShow.map((event) => (
            <CardEvents key={event.id} {...event} />
          ))}
        </div>
      </section>
    </>
  );
}
