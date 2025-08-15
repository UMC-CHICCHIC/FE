// 날짜 변환 함수 (년.월.일.)
export const DateTimeFormat = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}.`;
};

// (시:분)
export const HoursTimeFormat = (isoString: string) => {
  const date = new Date(isoString);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

// 리뷰 시간 : (월 일, 년)
export const ReviewTimeFormat = (isoString: string) => {
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoString));

  return date;
};
