export const isValid = (value) => /^[a-z0-9]{1,20}$/.test(value);
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const getFirstImage = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return "/images/placeholder.jpg";
  }
  return images[0];
};

export const baseItem = (itemId, quantity, listOptions) => {
  return [itemId, 0, 7, quantity, false, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, false, false, listOptions ? listOptions : [], "", "", "#1 Vòng quay may mắn trên web", 0, false, -1, -1, -1, -1, -1, -1];
};
