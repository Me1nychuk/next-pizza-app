"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";

import { IStory } from "@/shared/services/stories";
import { Api } from "@/shared/services/api-client";

import { Container } from "@/shared/components/shared";

import StoriesComponent from "react-insta-stories";
import { X } from "lucide-react";

interface StoriesProps {
  className?: string;
}
export const Stories = ({ className }: StoriesProps) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    const fetchStories = async () => {
      const data = await Api.stories.getAll();
      setStories(data);
    };
    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);
    if (story.items.length > 0) {
      setOpen(true);
    }
  };
  return (
    <>
      <Container
        className={cn(
          "flex items-center justify-between gap-2 my-10",
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[250px] w-[200px] bg-gray-100 rounded-md animate-pulse "
            ></div>
          ))}

        {stories.map((story) => (
          <img
            key={story.id}
            className="object-cover rounded-md cursor-pointer h-[250px] w-[200px] shadow-lg "
            onClick={() => onClickStory(story)}
            width={200}
            height={250}
            src={story.previewImageUrl}
          />
        ))}

        {open && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-40">
            <div className="relative" style={{ width: 520 }}>
              <button
                className="absolute -top-5 -right-10 z-41"
                onClick={() => setOpen(false)}
              >
                <X
                  className=" absolute top-0 right-0 text-white/50"
                  size={32}
                />
              </button>

              <StoriesComponent
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items?.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
