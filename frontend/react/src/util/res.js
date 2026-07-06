const API_DOMAIN = import.meta.env.VITE_API_URL || "http://localhost:3000/"
export const get = async(path)=>{
  const res = await fetch(API_DOMAIN+path)
  const result = await res.json()
  return result
}

export const create = async (path,option)=>{
  const res = await fetch(API_DOMAIN+path, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    const result = await res.json();
    return result
}



export const patch = async(path,option)=>{
  const res = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(option),
    });
    const result = await res.json();
    return result
}