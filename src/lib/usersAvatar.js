// const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

// export async function usersAvatar(image) {
//   const formData = new FormData();
//   formData.append("image", image);

//   const res = await fetch(
//     `https://api.imgbb.com/1/upload?key=${API_KEY}`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();
//   console.log('data', data);

//   return data.data.url;
// }

// const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

// export async function usersAvatar(image) {
//   const formData = new FormData();
//   formData.append("image", image);

//   const res = await fetch(
//     `https://api.imgbb.com/1/upload?key=${API_KEY}`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();

//   console.log("ImageBB Response:", data);
//   console.log(process.env.NEXT_PUBLIC_IMGBB_API_KEY);

//   return data?.data?.url;
// }

export async function usersAvatar(image) {
  console.log("usersAvatar called");
  console.log(image);

  const formData = new FormData();
  formData.append("image", image);

  console.log("Before fetch");

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  console.log("After fetch");

  const data = await res.json();
  console.log("ImageBB Response:", data);

  return data?.data?.url;
}