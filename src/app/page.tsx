import MyCarousel from "@/components/Carousel/MyCarousel";
import CardEvents from "@/components/Events/CardEvents";
import EventsHome from "@/components/Events/EventsHome";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import SubscribeHome from "@/components/SubscribeHome/SubscribeHome";
import { eventPreLoad } from "@/helpers/eventPreLoad";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MyCarousel />
      <EventsHome />
      <SubscribeHome />
      <SocialMedia/>
    </>
  );
}
