import { useEffect, useRef, useState } from "react";
import "./Grid.css";
const Grid = () => {
  const data = [
    {
      id: "1",
      image: "../../assets/images/image-1.webp",
    },
    {
      id: "2",
      image: "../../assets/images/image-2.webp",
    },
    {
      id: "3",
      image: "../../assets/images/image-3.webp",
    },
    {
      id: "4",
      image: "../../assets/images/image-4.webp",
    },
    {
      id: "5",
      image: "../../assets/images/image-5.webp",
    },
    {
      id: "6",
      image: "../../assets/images/image-6.webp",
    },
    {
      id: "7",
      image: "../../assets/images/image-7.webp",
    },
    {
      id: "8",
      image: "../../assets/images/image-8.webp",
    },
    {
      id: "9",
      image: "../../assets/images/image-9.webp",
    },
    {
      id: "10",
      image: "../../assets/images/image-10.jpeg",
    },
    {
      id: "11",
      image: "../../assets/images/image-11.jpeg",
    },
  ];
  const [images, setImages] = useState(data); // variable for storing data
  const [selectedImages, setSelectedImages] = useState([]); // variable for storing selected data
  const [checked, setChecked] = useState(false); // checkbox toggle button

  const dragItem = useRef(); // item to drag
  const dragOverItem = useRef(); // item on which the dragged item will be dropped

  // drag an item to drop
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  // drop the item on selected place
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  // drop the item
  const drop = (e) => {
    const copyListItems = [...images];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(copyListItems);
  };

  // to select an item
  const handleClick = (item) => {
    setChecked(true);

    if (selectedImages.includes(item.id)) {
      setSelectedImages(selectedImages.filter((id) => id !== item.id));
    } else {
      setSelectedImages([...selectedImages, item.id]);
    }
  };

  // to delete the selected items
  const handleDelete = () => {
    setImages((prevImages) => {
      return prevImages.filter((image) => !selectedImages.includes(image.id));
    });
    setSelectedImages([]);
    setChecked(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {selectedImages.length > 0 && (
        <div style={{ padding: 20 }}>
          <p
            style={{ position: "absolute", right: 0, cursor: "pointer" }}
            onClick={handleDelete}
          >
            Delete files
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ marginTop: 17 }}>
              <input
                type="checkbox"
                checked={checked}
                className="image-checkbox"
              />
            </div>
            <div>
              <p
                style={{
                  position: "absolute",
                  left: 0,
                  marginLeft: 40,
                }}
              >
                {selectedImages.length} Files Selected
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="angry-grid">
        {images.map((item, index) => (
          <div
            draggable
            className="imageDiv"
            key={item.id}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
          >
            {checked ? (
              <input
                type="checkbox"
                checked={selectedImages.includes(item.id)}
                onChange={() => handleClick(item)}
                className="image-checkbox"
              />
            ) : null}

            <img
              className="image"
              src={item.image}
              alt=""
              onClick={() => handleClick(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
