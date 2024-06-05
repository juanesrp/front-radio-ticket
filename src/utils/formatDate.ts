import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "d 'de' MMMM", { locale: es });
  return formattedDate.toUpperCase();
};
