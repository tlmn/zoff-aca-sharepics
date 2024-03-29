import React, { useRef, useState } from "react";

import AcaColored from "../../components/svg/acaColored";
import ColouredBar from "../../components/svg/colouredBar";
import Draggable from "react-draggable";
import { Link } from "gatsby";
import { formatEmojis } from "../../components/lib/lib";
import htmlToImage from "html-to-image";
import slugify from "react-slugify";

export default () => {
  const [image, setImage] = useState(null);
  const [imageScale, setImageScale] = useState(0);
  const [textScale, setTextScale] = useState(100);
  const [topic, setTopic] = useState("Airline / Thema");
  const [news, setNews] = useState(
    "Hier kommt der Newstext rein.\nEmojis gehen auch! ✈️"
  );
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const sharepicRef = useRef(null);
  const draggableRef = useRef(null);

  const html2image = () => {
    htmlToImage
      .toJpeg(sharepicRef.current, { quality: 1, width: 600, height: 600 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `sharepic-${slugify(news)}.jpg`;
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="container p-5">
      <Link to="/" className="block text-center text-md">
        ← zurück zur Auswahl
      </Link>
      <div className="grid grid-cols-12 col-gap-2 py-2">
        <div className="col-span-12 sm:col-span-9 flex justify-center">
          <br />
          <div
            style={{
              width: "600px",
              height: "600px",
              gridAutoRows: "1fr",
            }}
            className="grid grid-cols-8 col-gap-2 relative bg-white"
            ref={sharepicRef}
          >
            <Draggable
              onDrag={(e, data) => {
                setImagePosition({ x: data.x, y: data.y });
              }}
              onStop={(e, data) => {
                setImagePosition({ x: data.x, y: data.y });
                draggableRef.current.style.transform = "translate(0px, 0px)";
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full z-50 cursor-pointer"
                ref={draggableRef}
                draggable
              />
            </Draggable>
            <div
              className="absolute top-0 left-0 z-10 w-full"
              style={{
                backgroundImage: `url(${
                  image !== null ? image : "/assets/images/engines.jpg"
                })`,
                height: "50%",
                backgroundPositionX: `${imagePosition.x}px`,
                backgroundPositionY: `${imagePosition.y}px`,
                backgroundSize: `${imageScale * 10 + 100}%`,
              }}
            />
            <div
              className="bg-black absolute z-20 w-full"
              style={{
                height: "50%",
                backgroundColor: "rgba(51, 51, 51, 0.25)",
                mixBlendMode: "multiply",
              }}
            ></div>
            <div className="col-span-8 flex justify-center z-20">
              <span
                dangerouslySetInnerHTML={{ __html: topic }}
                className="mt-2 font-bold italic text-white text-md"
              />
            </div>
            <div className="col-span-6 w-full col-start-2 text-center flex flex-col items-center text-gray z-30">
              <div
                style={{ flexGrow: "1" }}
                className="flex items-center self-center leading-none font-bold text-2xl"
              >
                <div>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatEmojis(news),
                    }}
                    style={{
                      whiteSpace: "pre-line",
                      fontSize: `${(parseInt(textScale) / 100) * 2.7}rem`,
                    }}
                    className="italic"
                  />
                </div>
              </div>
              <AcaColored width="200" className="block mb-12" />
            </div>
            <ColouredBar width="600" className="absolute bottom-0 z-30" />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-3">
          <label htmlFor="file">Bild auswählen</label>
          <input
            type="file"
            id="file"
            name="file"
            id="file"
            name="file"
            onChange={(e) =>
              e.target.files[0] !== null &&
              setImage(URL.createObjectURL(e.target.files[0]))
            }
          />
          <label htmlFor="imageScale" className="block">
            Zoomfaktor für Bild
          </label>
          <input
            type="range"
            id="imageScale"
            name="imageScale"
            min="0"
            defaultValue={imageScale}
            max="30"
            onChange={(e) => setImageScale(e.target.value)}
          />
          <button
            className="block border-2 border-black p-1 mt-2"
            onClick={() => setImagePosition({ x: 0, y: 0 })}
          >
            Reset Bildausschnitt
          </button>
          <label htmlFor="topic" className="block">
            Thema
          </label>
          <input
            id="topic"
            defaultValue={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-2 border-black"
          />
          <label htmlFor="news" className="block">
            News
          </label>
          <textarea
            id="news"
            rows={4}
            cols={30}
            defaultValue={news}
            onChange={(e) => setNews(e.target.value)}
            className="border-2 border-black"
          />
          <label htmlFor="textScale" className="block">
            Zoomfaktor für Text
          </label>
          <input
            type="range"
            id="textScale"
            name="textScale"
            min="80"
            defaultValue={textScale}
            max="140"
            onChange={(e) => setTextScale(e.target.value)}
          />
          <button
            className="block border-2 border-black p-1 mt-2"
            onClick={() => html2image()}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
