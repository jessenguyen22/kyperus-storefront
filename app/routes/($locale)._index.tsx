import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from 'react-router';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {GradientText, GradientHeading} from '~/components/GradientText';
import {KprButton} from '~/components/KprButton';




export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      {/* Gradient Headings Demo */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center space-y-8">
          <GradientHeading level={1} variant="default" className="text-6xl font-oxanium">
            Welcome to Kyperus
          </GradientHeading>
          
          <GradientHeading level={2} variant="primary" className="text-4xl font-oxanium">
            Premium Pool Cues
          </GradientHeading>
          
          <GradientHeading level={3} variant="cyber" className="text-3xl font-oxanium">
            Cyberpunk Collection
          </GradientHeading>
          
          <GradientHeading level={4} variant="neon" className="text-2xl font-oxanium">
            Neon Series
          </GradientHeading>
          
          <GradientText as="p" variant="white" className="text-xl">
            Experience the ultimate in precision and style
          </GradientText>
          
          <GradientText as="p" variant="cyber" animate className="text-lg">
            Animated Cyber Text Effect
          </GradientText>
          
          {/* KprButton Demo */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <KprButton variant="primary" size="lg">
              Shop Collection
            </KprButton>
            <KprButton variant="secondary" size="lg">
              Learn More
            </KprButton>
          </div>
          
          <div className="flex gap-4 justify-center items-center mt-6">
            <KprButton variant="primary" size="md">
              Add to Cart
            </KprButton>
            <KprButton variant="secondary" size="md">
              Quick View
            </KprButton>
          </div>
          
          <div className="flex gap-4 justify-center items-center mt-4">
            <KprButton variant="primary" size="sm">
              Small Primary
            </KprButton>
            <KprButton variant="secondary" size="sm">
              Small Secondary
            </KprButton>
          </div>
        </div>
      </section>

      <RecommendedProducts products={data.recommendedProducts} />
      <RecommendedProducts products={data.recommendedProducts} />
      <RecommendedProducts products={data.recommendedProducts} />
      <RecommendedProducts products={data.recommendedProducts} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products">
      <GradientHeading level={2} variant="cyber" className="text-4xl font-bold text-center mb-5 underline font-oxanium">
        Recommended Products II
      </GradientHeading>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
