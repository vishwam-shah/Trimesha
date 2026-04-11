"use client";

import { useModal } from "@/components/ui/animated-modal";
import BookingCalendar from "@/components/booking-calendar";

export function ModalRoot() {
  const { open, setOpen } = useModal();
  return (
    <BookingCalendar
      open={open}
      onOpenChange={setOpen}
      packageTitle="Discovery call"
      duration="30 minutes"
      price="Complimentary"
    />
  );
}

export default ModalRoot;
