"use client";

import { supabase } from "@/lib/supabase/client";
import { Tabs, Tab, Skeleton, Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const CategoriesTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<
    {
      category: string;
      key: number;
    }[]
  >([]);

  const tabRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, categories.length);
  }, [categories]);

  // React.useEffect(() => {
  //   if (tabRefs.current.length > 0) {
  //     const categoryIdStr = searchParams.get("category_id");
  //     const categoryId = categoryIdStr ? parseInt(categoryIdStr) : 1;
  //     tabRefs.current[categoryId]?.click();
  //   }
  // }, [searchParams, tabRefs]);

  // const _categories = [
  //   { key: 1, category: "Job Opportunities" },
  //   { key: 2, category: "Technology Trends" },
  //   { key: 3, category: "Coding Challenges" },
  //   { key: 4, category: "Project Showcasing" },
  //   { key: 5, category: "Tech Events and Meetups" },
  //   { key: 7, category: "General Discussions" },
  // ];

  return (
    <div className="flex w-full flex-col">
      {isLoading ? (
        <Skeleton className="h-[44px] rounded-lg border border-default"></Skeleton>
      ) : (
        <div className="flex gap-1 items-center w-full justify-evenly">
          <Button
            className="rounded-full lg:hidden"
            onClick={() => {
              tabRefs.current[2]?.click();
            }}
          >
            <FaArrowAltCircleLeft />
          </Button>

          <Tabs
            className="w-9/12 lg:w-full"
            aria-label="Options"
            color="primary"
            variant="bordered"
            selectedKey={searchParams.get("category_id") || "1"}
            // onSelectionChange={(key) => {
            //   const params = new URLSearchParams(searchParams);
            //   params.set("category_id", key.toString());
            //   const newPath = `${pathname}?${params.toString()}`;
            //   router.replace(newPath);
            // }}
          >
            {categories.map((category, index) => {
              return (
                <Tab
                  key={category.key}
                  title={
                    <Link
                      href={`/posts?category_id=${category.key}`}
                      shallow={true}
                    >
                      <div
                        // onClick={() => {
                        //   const params = new URLSearchParams(searchParams);
                        //   params.set("category_id", category.key.toString());
                        //   const newPath = `${pathname}?${params.toString()}`;
                        //   router.replace(newPath);
                        // }}
                        ref={(ref) => (tabRefs.current[index] = ref)}
                        className="flex items-center space-x-2"
                      >
                        <span>{category.category}</span>
                      </div>
                    </Link>
                  }
                />
              );
            })}
          </Tabs>
          <Button
            className="rounded-full lg:hidden"
            onClick={() => {
              tabRefs.current[5]?.click();
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
