import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% -1500vh",
      initialMaskSize: "3100% 3100%",
      maskPos: "50% 7vh",
      maskSize: "50% 50%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% -1700vh",
      initialMaskSize: "3500% 3500%",
      maskPos: "50% 17vh",
      maskSize: "30% 30%",
    };
  }

  return {
    initialMaskPos: "50% 22.3%",
    initialMaskSize: "4000% 4000%",
    maskPos: "50% 22.3%", // Đo từ khoảng cách 50% theo chiều ngang và 22% theo chiều dọc của container
    maskSize: "17% 17%",
  };
};