import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useSearchParams, notFound } from "next/navigation";
import Container from "@/components/Container";
import PaginationControl from "@/components/PaginationControl";
import ComicCategory from "@/components/ComicCategory";

const getComicData = async (page: any, offset: any, ctid: any) => {
  const query = {
    page: page,
    offset: offset,
    categoryIds: ctid,
  };
  const urlPage = process.env.NEXT_URL;
  let url = `${urlPage}/api/comic?`;
  Object.entries(query).forEach(([key, value], index) => {
    if (value !== undefined) url += key + "=" + value + "&";
  });
  const data = await fetch(url, { cache: "no-store" });
  return data.json();
};
const getCategoryData = async () => {
  const urlPage = process.env.NEXT_URL;
  const responseComicTypes = await fetch(`${urlPage}/api/comicTypes`);
  return responseComicTypes.json();
};

export default async function SearchType({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const Page = searchParams["page"] ?? "1";
  const categoryIDs = searchParams["categoryIds"];
  let page = Number(Page);
  if (page <= 0 || isNaN(page)) notFound();
  const perPage = 40;
  const comicFetch = getComicData(page, perPage, categoryIDs);
  const categoryFetch = getCategoryData();
  const [comicsData, categoriesData] = await Promise.all([
    comicFetch,
    categoryFetch,
  ]);
  const { totalComicsCount, comics } = comicsData;
  return (
    <div className="container mx-auto">
      <ComicCategory data={categoriesData} />
      <Container data={comics} />
      <PaginationControl count={totalComicsCount} perPage={perPage} />
    </div>
  );
}
