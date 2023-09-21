import { useState, useEffect } from "react";
import Image from "next/image";
import { image_samples } from "../(data)/image-sample";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast, Toaster } from "react-hot-toast";
import { IconTag } from '@tabler/icons-react';

type ImageData = {
  id: string;
  image: string;
  tag: string;
};

function ImageContainer() {
  const [characters, setCharacters] = useState<ImageData[]>(image_samples);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCharacters, setFilteredCharacters] = useState<ImageData[]>(characters);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to filter characters based on search query
  const filterCharacters = () => {
    const filtered = characters.filter((character) =>
      character.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  useEffect(() => {
    filterCharacters();
  }, [searchQuery, characters]);

  // Handle search input change
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  // Handle drag and drop reordering
  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(filteredCharacters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);

    toast.success("Image Reordered Successfully", {
      icon: "👍",
    });
  }

  return (
    <>
      <Toaster />
      <div className='mx-auto px-[2.7em] py-6 mb-[2.5em] text-white bg-primary flex flex-col sm:flex-row justify-between items-center'>
        <div className='text-3xl py-4 font-semibold flex gap-5'>
          Image Gallery with Drag and drop
        </div>

        <div className="">
        <input
          type='text'
          placeholder='Search images by tag...'
          className='placeholder-white w-full sm:w-[300px] text-base border-b border-gray-300 font-normal leading-normal bg-transparent outline-none'
          value={searchQuery}
          onChange={handleInputChange}
        />
        </div>
      </div>
      <div className='p-5 md:p-10'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='image-gallery' direction='horizontal'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='grid grid-cols-fluid gap-4'
              >
                {filteredCharacters.map(({ id, image, tag }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        {loading ? (
                          <div className='w-[280px] max-sm:w-full h-[320px] bg-gray-300 animate-pulse' />
                        ) : (
                          <div className='w-[280px] max-sm:w-full h-[320px] rounded-[4px] bg-slate-300'>
                            <Image
                              src={image}
                              alt={`Image ${index}`}
                              width={200}
                              height={200}
                              loading='lazy'
                              className='w-full h-full object-cover hover:brightness-50'
                            />
                          </div>
                        )}
                        <div className='relative opacity-70 flex gap-3 max-sm:w-full w-[280px] bg-primary text-white  p-2'>
                          <IconTag size={20} />
                          {tag}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default ImageContainer;
