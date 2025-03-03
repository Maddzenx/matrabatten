import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { StoreTags } from "@/components/StoreTags";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ProductGrid } from "@/components/ProductGrid";
import { BottomNav, NavItem } from "@/components/BottomNav";

const Index = () => {
  const navigate = useNavigate();
  const [storeTags] = useState([
    { id: "1", name: "Hemköp Stadshagen" },
    { id: "2", name: "Willys Hornsberg" },
  ]);

  const [categories] = useState([
    { id: "fruits", name: "Frukt & grönt" },
    { id: "bread", name: "Bröd & bageri" },
    { id: "meat", name: "Kött, fågel & chark" },
    { id: "dairy", name: "Mejeri & Ägg" },
    { id: "fish", name: "Fisk & Skaldjur" },
    { id: "readymeals", name: "Färdigmat & Frysta Matvaror" },
    { id: "bakery", name: "Bröd & Bakverk" },
    { id: "drinks", name: "Drycker" },
    { id: "snacks", name: "Snacks & Godis" },
  ]);

  const [activeCategory, setActiveCategory] = useState("fruits");
  
  const [cartCount, setCartCount] = useState(0);

  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "offers", icon: "discount", label: "Erbjudanden", active: true },
    { id: "recipes", icon: "book", label: "Recept" },
    { id: "menu", icon: "search", label: "Matsedel" },
    { id: "cart", icon: "shopping-cart", label: "Inköpslista" },
    { id: "profile", icon: "user", label: "Profil" },
  ]);

  useEffect(() => {
    setNavItems(prev => 
      prev.map(item => 
        item.id === "cart" 
          ? { ...item, badge: cartCount > 0 ? cartCount : undefined } 
          : item
      )
    );
  }, [cartCount]);

  const products = {
    fruits: [
      {
        id: "1",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/eeb534dfbe6c426ae51cbc1f3875c84fd6360b99",
        name: "Bregott",
        details: "Arla, 250g Jmf pris 33 kr/kg",
        currentPrice: "30 kr/st",
        originalPrice: "52 kr/st",
        store: "Hemköp Stadshagen",
      },
      {
        id: "2",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/64b28de86c94c63de9f812dcf6f98704ae921030",
        name: "Bregott",
        details: "Arla, 250g Jmf pris 33 kr/kg",
        currentPrice: "30 kr/st",
        originalPrice: "52 kr/st",
        store: "Hemköp Stadshagen",
        offerBadge: "2 för 10",
      },
    ],
    bread: [
      {
        id: "3",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f",
        name: "Mozzarella",
        details: "Galbani, 226g",
        currentPrice: "10 kr/st",
        originalPrice: "25 kr/st",
        store: "Hemköp Stadshagen",
      },
      {
        id: "4",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f",
        name: "Bregott",
        details: "Arla, 250g Jmf pris 33 kr/kg",
        currentPrice: "30 kr/st",
        originalPrice: "52 kr/st",
        store: "Hemköp Stadshagen",
      },
    ],
  };

  const handleRemoveTag = (id: string) => {
    console.log("Remove tag:", id);
  };

  const handleNavSelect = (id: string) => {
    if (id === "cart") {
      navigate("/shopping-list");
    } else {
      console.log("Selected nav:", id);
    }
  };

  const handleProductQuantityChange = (productId: string, newQuantity: number, previousQuantity: number) => {
    const quantityDifference = newQuantity - previousQuantity;
    setCartCount(prev => Math.max(0, prev + quantityDifference));
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <div className="min-h-screen w-full bg-white pb-20">
        <SearchBar />
        <StoreTags tags={storeTags} onRemove={handleRemoveTag} />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <main className="p-4">
          {Object.entries(products).map(([category, items]) => (
            <section key={category} className="mb-8">
              <ProductGrid
                title={categories.find((c) => c.id === category)?.name || ""}
                products={items}
                onQuantityChange={handleProductQuantityChange}
              />
            </section>
          ))}
        </main>
        <BottomNav items={navItems} onSelect={handleNavSelect} />
      </div>
    </>
  );
};

export default Index;
