// type Props = {};

// function Footer({}: Props) {
//   return (
//     <footer className='bg-white rounded-lg m-4'>
//       <div className='w-full max-w-screen-xl text-center mx-auto p-4 md:py-8'>
//         <a href="https://github.com/ahmad-cod/image-gallery-with-dnd">Visit Repo</a>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import { IconPhotoPlus } from "@tabler/icons-react";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className='bg-white rounded-lg m-4'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <a
            href='https://flowbite.com/'
            className='flex items-center mb-4 sm:mb-0'
          >
            <IconPhotoPlus size={20} className='h-8 mr-3' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap text-black'>
              Aro Photo Plus
            </span>
          </a>
          <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © {new Date().getFullYear()}
          <a href='' className='hover:underline ml-1'>
            Aro Photo Plus™
          </a>
          . All Rights Reserved.
        </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;