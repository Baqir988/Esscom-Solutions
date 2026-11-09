import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { productCategories, getProductCategory } from "@/data/product-categories";
import { catalogItems } from "@/data/products";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/catalog/product-card";
import { ContactCTA } from "@/components/ui/contact-cta";
import { EquipmentIllustration } from "@/components/ui/equipment-illustration";
import { ApprovedImage } from "@/components/ui/approved-image";

export const dynamicParams = false;
const categories = productCategories.filter((category) => catalogItems.some((item) => item.categoryId === category.id));
export function generateStaticParams() { return categories.map(({ id }) => ({ category: id })); }
type Props = { params: Promise<{ category: string }> };
export async function generateMetadata({params}:Props):Promise<Metadata>{const {category:id}=await params;const category=getProductCategory(id);if(!category||!categories.some((item)=>item.id===id))notFound();return pageMetadata(`${category.title} Equipment Category`,`Browse ${category.title} references and equipment categories from the supplied company profile.`,`/products/category/${id}/`)}
export default async function ProductCategoryPage({params}:Props){const {category:id}=await params;const category=getProductCategory(id);if(!category||!categories.some((item)=>item.id===id))notFound();const items=catalogItems.filter((item)=>item.categoryId===id);const image=items.find((item)=>item.image?.approved)?.image;return <><section className="category-hero"><Container><Breadcrumb items={[{label:"Home",href:"/"},{label:"Products",href:"/products/"},{label:category.shortTitle,href:`/products/category/${id}/`}]} /><div className="category-hero-grid"><div><p className="eyebrow">PRODUCT CATEGORY · {String(items.length).padStart(2,"0")} REFERENCES</p><h1>{category.title}</h1><p className="page-hero-description">{category.description}</p><p className="category-attribution"><strong>{category.divisionLabel}</strong><br/>{category.catalogNote}</p><Link className="button button-primary" href="/contact/">Discuss a requirement <ArrowUpRight size={17}/></Link></div><figure className="category-hero-image">{image?<ApprovedImage image={image} label={category.title} visual={category.visual} sizes="(max-width: 699px) 100vw, 48vw" priority/>:<EquipmentIllustration variant={category.visual} label={category.title}/>}<figcaption>Representative profile image · exact model details vary</figcaption></figure></div></Container></section><SectionWrapper className="section-white"><div className="section-top"><SectionHeading eyebrow="CATEGORY CATALOG" title={`Explore ${category.shortTitle.toLowerCase()} references.`} description="Product references and profile-stated details are shown individually. Current ownership, availability, and configurations should be confirmed."/><span className="category-result-count">{items.length} items</span></div><ProductGrid items={items}/></SectionWrapper><SectionWrapper><Link className="back-catalog-link" href="/products/"><ArrowLeft size={17}/> Back to all categories and equipment</Link></SectionWrapper><ContactCTA title="Need help narrowing the requirement?" description="Review the profile reference, then contact ESSCOM to discuss the intended use and confirm current options."/></>}
