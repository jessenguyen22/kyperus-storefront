import {useLoaderData, Link} from 'react-router';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import {ProductItem} from '~/components/ProductItem';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './FeaturedCollection.css';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedCollectionProps {
  collection?: Collection;
  title?: string;
  bypassAnimation?: boolean;
  className?: string;
}

export function FeaturedCollection({
  collection,
  title,
  bypassAnimation = false,
  className = '',
}: FeaturedCollectionProps) {
  const {products} = collection || {};

  useGSAP(() => {
    if (bypassAnimation) return;

    const ctx = gsap.context(() => {
      // Fade in animation for the title
      gsap.from('.featured-collection-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: '.featured-collection-title',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      });

      // Stagger animation for products
      gsap.from('.featured-collection-product', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.featured-collection-products',
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [bypassAnimation]);

  if (!collection || !products?.nodes) return null;

  return (
    <section className={`featured-collection ${className}`}>
      <div className="featured-collection-header">
        <h2 className="featured-collection-title">
          {title || collection.title}
        </h2>
        <Link
          to={`/collections/${collection.handle}`}
          className="featured-collection-link"
        >
          Xem tất cả
        </Link>
      </div>

      <div className="featured-collection-products">
        {products.nodes.slice(0, 4).map((product) => (
          <div key={product.id} className="featured-collection-product">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </section>
  );
} 