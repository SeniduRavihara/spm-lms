"use client";

import { Star, ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    title: "How to Do a Website UI Audit E-book",
    category: "Admin",
    price: "$15",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300",
  },
  {
    title: "ChatGPT for UI UX Design E-book",
    category: "Ricardo Daw",
    price: "$10",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=300",
  },
  {
    title: "Practical UI UX Playbook E-book",
    category: "Admin",
    price: "$20",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300",
  },
  {
    title: "Painting tools",
    category: "John Does",
    price: "$30",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300",
  },
  {
    title: "Advanced Microscope",
    category: "Linda Anderson",
    price: "$250",
    rating: 5,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=300",
  },
  {
    title: "Business Software",
    category: "James Kong",
    price: "$70",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=300",
  },
];

export default function StoreProducts() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-4 uppercase">
             Store
          </div>
          <h2 className="text-4xl font-medium text-foreground">Store Products</h2>
          <p className="text-foreground-muted mt-4">Discover a variety of physical and digital products designed to enhance your learning experience.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {PRODUCTS.map((product, index) => (
            <div key={index} className="bg-card border border-border rounded-md p-6 card-hover group cursor-pointer flex items-center gap-6">
               <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="flex-1">
                  <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{product.title}</h3>
                  <div className="text-sm text-foreground-muted mb-3 italic">{product.category}</div>
                  <div className="flex items-center justify-between">
                     <div className="text-xl font-medium text-primary">{product.price}</div>
                     <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-foreground">{product.rating}</span>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="text-center">
           <button className="px-10 py-4 bg-primary text-white font-medium rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all inline-flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Follow Store
           </button>
        </div>
      </div>
    </section>
  );
}
