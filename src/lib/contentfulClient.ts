const gqlAllCategories = `
query {
  kategorijaCollection {
    items {
      naziv
      nazivEngleski
      slika{
        url
      }
      slug
    }
  }
}
`;

const gqlGetArtikalsByCategorySlug = `
query GetArtikalsByCategorySlug($slug: String!) {
  kategorijaCollection(where: { slug: $slug }, limit: 1) {
    items {
      naziv
      nazivEngleski
      slika{
        url
      }
      slug
      linkedFrom {
        entryCollection {
          items {
            ... on Artikal {
              naziv
              nazivEngleski
              cijena
              volumen
            }
          }
        }
      }
    }
  }
}
`;

const baseUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`;

export interface ArtikalByCategorySlugItem {
  kategorijaCollection:{
    items: {
      naziv: string;
      nazivEngleski: string;
      slika: {
        url: string;
      }
      slug: string;
      linkedFrom: {
        entryCollection: {
          items: ArtikalItem[];
      };
    };
    }[];  
  };
};

export interface ArtikalItem{
  naziv: string;
  nazivEngleski?: string;
  cijena: number;
  volumen: string;
}

export interface KategorijaItem{
  naziv: string;
  nazivEngleski: string;
  slika: {
    url: string;
  }
  slug: string;
}

export interface ParsiraniArtikal{
  naziv: string;
  nazivEngleski?: string;
  slika: string;
  slug: string;
  artikli: ArtikalItem[];
}

const test = () => {
  console.log(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
  console.log(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY);
}

const getAllKategorijas = async() => {
  try{
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY}`
      },
      body: JSON.stringify({ query: gqlAllCategories })
    });

    const body = (await res.json()) as {data: {kategorijaCollection: {items: KategorijaItem[]}}};
   
    return body.data.kategorijaCollection.items;
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const getArtikalsByCategorySlug = async (slug: string): Promise<ParsiraniArtikal | null> => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY}`
    },
    body: JSON.stringify({ query: gqlGetArtikalsByCategorySlug, variables: { slug } })
  });

  const body = (await res.json()) as { data: ArtikalByCategorySlugItem };

  const item = body.data.kategorijaCollection.items[0];
  if (!item) return null;

  return {
    naziv: item.naziv,
    nazivEngleski: item.nazivEngleski,
    slika: item.slika.url,
    slug: item.slug,
    artikli: item.linkedFrom.entryCollection.items.map(artikal => ({
      naziv: artikal.naziv,
      nazivEngleski: artikal.nazivEngleski,
      cijena: artikal.cijena,
      volumen: artikal.volumen
    }))
  };
};

async function getKategorijaBySlug(slug: string) {
  const query = `
    query GetKategorijaBySlug($slug: String!) {
      kategorijaCollection(where: { slug: $slug }, limit: 1) {
        items {
          sys { id }
          naziv
          nazivEngleski
          slika
          slug
        }
      }
    }
  `;

  const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { slug } }),
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data?.data?.kategorijaCollection?.items?.[0] || null;
}


const contentfulService = {
  test,
  getAllKategorijas,
  getArtikalsByCategorySlug,
  getKategorijaBySlug,
};

export default contentfulService;