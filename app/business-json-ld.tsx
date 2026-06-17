import { site } from "../lib/site";

export default function BusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    address: site.address,
    telephone: site.phone,
    url: "https://kale-txiki-web.vercel.app",
    servesCuisine: ["Menú diario", "Pintxos", "Raciones", "Pizzas", "Hamburguesas"],
    priceRange: "€€",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
