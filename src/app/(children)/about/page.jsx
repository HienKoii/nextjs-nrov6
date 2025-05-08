"use client";

import { Box, Divider, Heading, Image, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <>
      <VStack spacing={4} align="stretch">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Box>
            <Image
              src="/images/banner/1.png"
              alt="Banner" //
              width="100%"
              height="400px"
              objectFit="cover"
              borderRadius="lg"
            />
          </Box>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Box>
            <Heading size="lg" textAlign="center">
              Giới thiệu
            </Heading>
            <Divider orientation="horizontal" mt={2} mb={2} />
            <Text fontSize="md" color="gray.600">
              - Ngọc Rồng Online là Trò Chơi Trực Tuyến với cốt truyện xoay quanh bộ truyện tranh 7 viên Ngọc Rồng. Người chơi sẽ hóa thân thành một trong những anh hùng của 3 hành tinh: Trái Đất, Xayda, Namếc. Cùng
              luyện tập, tăng cường sức mạnh và kỹ năng. Đoàn kết cùng chiến đấu chống lại các thế lực hung ác. Cùng nhau tranh tài. Đặc điểm nổi bật:
              <br /> - Thể loại hành động, nhập vai. Trực tiếp điều khiển nhân vật hành động. Dễ chơi, dễ điều khiển nhân vật. Đồ họa sắc nét. Có phiên bản đồ họa cao cho điện thoại mạnh và phiên bản pixel cho máy cấu
              hình thấp.
              <br /> - Cốt truyện bám sát nguyên tác. Người chơi sẽ gặp tất cả nhân vật từ Bunma, Quy lão kame, Jacky-chun, Tàu Pảy Pảy... cho đến Fide, Pic, Poc, Xên, Broly, đội Bojack.
              <br /> - Đặc điểm nổi bật nhất: Tham gia đánh doanh trại độc nhãn. Tham gia đại hội võ thuật. Tham gia săn lùng ngọc rồng để mang lại điều ước cho bản thân.
              <br /> - Tương thích tất cả các dòng máy trên thị trường hiện nay: Máy tính PC, Điện thoại di động Nokia Java, Android, iPhone, Windows Phone, và máy tính bảng Android, iPad.
            </Text>
          </Box>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Box>
            <Heading size="lg" textAlign="center">
              Hướng Dẫn Tân Thủ
            </Heading>
            <Divider orientation="horizontal" mt={2} mb={2} />
            <Box fontSize="md" color="gray.600">
              <OrderedList spacing={4}>
                <ListItem>
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      Tạo tài khoản
                    </Text>
                    <Text>
                      Ngọc Rồng Online sử dụng Tài Khoản riêng, không chung với bất kỳ Trò Chơi nào khác. Bạn có thể đăng ký tài khoản miễn phí ngay trong game, hoặc trên trang Diễn Đàn. Khi đăng ký, bạn nên sử dụng đúng
                      số điện thoại hoặc email thật của mình. Nếu sử dụng thông tin sai, người có số điện thoại hoặc email thật sẽ có thể lấy mật khẩu của bạn. Số điện thoại và email của bạn sẽ không hiện ra cho người
                      khác thấy. Admin không bao giờ hỏi mật khẩu của bạn.
                    </Text>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      Hướng dẫn điều khiển
                    </Text>
                    <Text>
                      Đối với máy bàn phím: Dùng phím mũi tên, phím số, để điều khiển nhân vật. Phím chọn giữa để tương tác. Đối với máy cảm ứng: Dùng tay chạm vào màn hình cảm ứng để di chuyển. Chạm nhanh 2 lần vào 1
                      đối tượng để tương tác. Đối với PC: Dùng chuột, click chuột phải để di chuyển, click chuột trái để chọn, click đôi vào đối tượng để tương tác
                    </Text>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      Một số thông tin căn bản
                    </Text>
                    <Text>
                      <br /> - Đậu thần dùng để tăng KI và HP ngay lập tức.
                      <br /> - Bạn chỉ mang theo người được 10 hạt đậu. Nếu muốn mang nhiều hơn, hãy xin từ bạn bè trong Bang.
                      <br /> - Tất cả các sách kỹ năng đều có thể học miễn phí tại Quy Lão Kame, khi bạn có đủ điểm tiềm năng.
                      <br /> - Bạn không thể bay, dùng kỹ năng, nếu hết KI.
                      <br /> - Tấn công quái vật cùng bạn bè trong Bang sẽ mang lại nhiều điểm tiềm năng hơn đánh một mình.
                      <br /> - Tập luyện với bạn bè tại khu vực thích hợp sẽ mang lại nhiều điểm tiềm năng hơn đánh quái vật.
                      <br /> - Khi được nâng cấp, đậu thần sẽ phục hồi nhiều HP và KI hơn.
                      <br /> - Vào trò chơi đều đặn mỗi ngày để nhận được Ngọc miễn phí.
                      <br /> - Đùi gà sẽ phục hồi 100% HP, KI. Cà chua phục hồi 100% KI. Cà rốt phục hồi 100% HP.
                      <br /> - Cây đậu thần kết một hạt sau một thời gian, cho dù bạn đang offline.
                      <br /> - Sau 3 ngày không tham gia trò chơi, bạn sẽ bị giảm sức mạnh do lười luyện tập.
                      <br /> - Bạn sẽ giảm thể lực khi đánh quái, nhưng sẽ tăng lại thể lực khi không đánh nữa.
                    </Text>
                  </Box>
                </ListItem>
              </OrderedList>
            </Box>
          </Box>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Box>
            <Heading size="lg" textAlign="center">
              Bạn nên tải phiên bản nào?
            </Heading>
            <Divider orientation="horizontal" mt={2} mb={2} />
            <Text fontSize="md" color="gray.600">
              - Nếu bạn dùng điện thoại Nokia cũ, có bàn phím như Nokia 6300, Nokia E72, Nokia X2, Nokia C2, Hãy tải bản JAVA
              <br /> - Nếu bạn dùng máy cảm ứng sử dụng Android như: Samsung Galaxy Y, HTC, LG, Sky, HKPhone. Hãy tải bản Android APK hoặc Android Playstore đều được.
              <br /> - Nếu bạn dùng điện thoại cảm ứng của NOKIA Lumia, hoặc các máy HTC chạy Windows Phone, hãy tải bản cho Windows Phone.
              <br /> - Nếu bạn dùng máy vi tính cá nhân, laptop chạy Windows XP - Windows 7, hãy tải bản PC.
              <br /> - Nếu bạn dùng iPhone, iPod, iPad, hãy tải bản iPhone Appstore. Nếu bạn biết chắc rằng máy mình đã jailbreak, có cài AppSync hoặc AppstoreVN, hãy cài từ bản iPhone jailbreak để tốc độ nhanh hơn.
            </Text>
          </Box>
        </motion.div>
      </VStack>
    </>
  );
}
