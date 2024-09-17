import { Fragment, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import FileDownLoad from "js-file-download";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown() {
  const handleDownloadClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://server-smoky-rho.vercel.app/", {
        method: "GET",
        responseType: "blob",
      });
      FileDownLoad(response.data, "Archies_Resume.pdf");
      console.log("File downloaded successfully", response);
    } catch (error) {
      console.error("Error while downloading the file :", error);
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Resume
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2FArchies_Singh_kk.pdf?alt=media&token=38272bee-067a-49b9-9398-0353fb8f53fd"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " px-4 py-2 text-sm flex  "
                  )}
                  target="_blank"
                >
                  <button className="flex gap-2 items-center">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fpreview.svg?alt=media&token=b4940381-f367-4a9b-a543-b8ac2152ee1d"
                      width={20}
                      height={20}
                    />
                    <p>Preview🧭</p>
                  </button>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " px-4 py-2 text-sm flex"
                  )}
                >
                  <button
                    className="flex gap-2 items-center"
                    onClick={(e) => handleDownloadClick(e)}
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/imagestorage-6c529.appspot.com/o/HFTkj4OSb3YxnwMBg9OVQxzTrMK2%2Fimages%2Fdownload.svg?alt=media&token=d55077a4-926a-483e-ad1f-c4b62988e791"
                      width={20}
                      height={20}
                    />
                    <p>Download</p>
                  </button>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
