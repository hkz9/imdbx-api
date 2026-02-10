import DomParser from "dom-parser";
import apiRequestRawHtml from "./apiRequestRawHtml";

export default async function seriesFetcher(id) {
  try {
    const firstSeason = await getSeason({ id, seasonId: 1 });

    return {
      all_seasons: firstSeason?.all_seasons ?? [],
      seasons: [
        {
          ...firstSeason,
          all_seasons: undefined,
        },
      ],
    };
  } catch (error) {
    return {
      all_seasons: [],
      seasons: [],
    };
  }
}

export async function getSeason({ id, seasonId }) {
  const html = await apiRequestRawHtml(
    `https://www.imdb.com/title/${id}/episodes?season=${seasonId}`
  );

  let parser = new DomParser();
  let dom = parser.parseFromString(html);

  const nextData = dom.getElementsByAttribute("id", "__NEXT_DATA__");
  
  if (!nextData || !nextData[0]) {
    throw new Error("Could not find __NEXT_DATA__ element");
  }

  const json = JSON.parse(nextData[0].textContent);

  const episodes = json?.props?.pageProps?.contentData?.section?.episodes?.items ?? {};
  const seasons = json?.props?.pageProps?.contentData?.section?.seasons ?? [];

  return {
    name: json?.props?.pageProps?.contentData?.entityMetadata?.titleText?.text ?? "Unknown Series",
    episodes: Object.values(episodes).map((e, i) => {
      return {
        idx: i + 1,
        no: e?.episode ?? null,
        title: e?.titleText ?? "Unknown Episode",
        image: e?.image?.url ?? null,
        image_large: e?.image?.url ?? null,
        image_caption: e?.image?.caption ?? null,
        plot: e?.plot ?? "No plot available",
        publishedDate: e?.releaseDate ? new Date(
          e.releaseDate.year,
          e.releaseDate.month - 1,
          e.releaseDate.day
        ).toISOString() : null,
        rating: {
          count: e?.voteCount ?? 0,
          star: e?.aggregateRating ?? 0,
        },
      };
    }),
    all_seasons: seasons.map((s) => ({
      id: s?.value ?? null,
      name: `Season ${s?.value ?? "Unknown"}`,
      api_path: `/title/${id}/season/${s?.value ?? 1}`,
    })),
  };
}
