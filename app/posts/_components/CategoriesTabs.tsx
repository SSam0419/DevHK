"use client";

import { supabase } from "@/lib/supabase/client";
import { Tabs, Tab, Skeleton, Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

const CategoriesTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<
    {
      category: string;
      key: number;
    }[]
  >([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("2");

  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("forum_category").select("*");
      if (data) {
        const result = data
          .filter((category) => category.category !== null)
          .map((category) => {
            return {
              category: category.category || "",
              key: category.id,
            };
          });
        setCategories(result);
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, categories.length);
  }, [categories]);

  //delay filter
  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectedCategory) {
        const params = new URLSearchParams(searchParams);
        params.set("category_id", selectedCategory);
        const newPath = `${pathname}?${params.toString()}`;
        router.replace(newPath);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, router, searchParams, selectedCategory]);

  return (
    <div className="flex w-full flex-col">
      {isLoading ? (
        <Skeleton className="h-[44px] rounded-lg border border-default"></Skeleton>
      ) : (
        <div className="flex gap-1 items-center w-full justify-evenly">
          <Button
            className="rounded-full lg:hidden"
            onClick={() => {
              tabRefs.current[0]?.click();
            }}
          >
            <FaArrowAltCircleLeft />
          </Button>

          <Tabs
            className="w-9/12 lg:w-full"
            aria-label="Options"
            color="primary"
            variant="bordered"
            selectedKey={selectedCategory}
            onSelectionChange={(key) => {
              setSelectedCategory(key.toString());
            }}
          >
            {categories.map((category, index) => {
              return (
                <Tab
                  key={category.key}
                  title={
                    <div
                      ref={(ref) => (tabRefs.current[index] = ref)}
                      className="flex items-center space-x-2"
                    >
                      <span>{category.category}</span>
                    </div>
                  }
                />
              );
            })}
          </Tabs>
          <Button
            className="rounded-full lg:hidden"
            onClick={() => {
              tabRefs.current[categories.length - 1]?.click();
            }}
          >
            <FaArrowAltCircleRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoriesTabs;
