import { DataFooter } from '~/types/dataFooter.type'
import { icons } from '~/utils'
const { BsFacebook, AiFillInstagram, AiFillTwitterCircle } = icons

const footerTakeCare: Omit<DataFooter, 'icon' | 'link'>[] = [
  {
    id: 1,
    text: 'Trung tâm trợ giúp'
  },
  {
    id: 2,
    text: 'Shopee Blog'
  },
  {
    id: 3,
    text: 'Shopee Mall'
  },
  {
    id: 4,
    text: 'Hướng Dẫn Mua Hàng'
  },
  {
    id: 5,
    text: 'Thanh Toán'
  },
  {
    id: 6,
    text: 'Shopee Xu'
  },
  {
    id: 7,
    text: 'Vận Chuyển'
  },
  {
    id: 8,
    text: 'Trả Hàng & Hoàn Tiền'
  },
  {
    id: 9,
    text: 'Chăm Sóc Khách Hàng'
  },
  {
    id: 10,
    text: 'Chính Sách Bảo Hành'
  }
]
const footerAboutShopee: Omit<DataFooter, 'icon' | 'link'>[] = [
  {
    id: 1,
    text: 'Giới Thiệu Về Shopee Việt Nam'
  },
  {
    id: 2,
    text: 'Tuyển Dụng'
  },
  {
    id: 3,
    text: 'Điều Khoản Shopee'
  },
  {
    id: 4,
    text: 'Chính Sách Bảo Mật'
  },
  {
    id: 5,
    text: 'Chính Hãng'
  },
  {
    id: 6,
    text: 'Kênh Người Bán'
  },
  {
    id: 7,
    text: 'Flash Sales'
  },
  {
    id: 8,
    text: 'Chương Trình Tiếp Thị Liên Kết Shopee'
  },
  {
    id: 9,
    text: 'Liên Hệ Với Truyền Thông'
  }
]
const footerPay: Omit<DataFooter, 'icon' | 'link'>[] = [
  {
    id: 1,
    text: 'https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8'
  },
  {
    id: 2,
    text: 'https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16'
  },
  {
    id: 3,
    text: 'https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08'
  },
  {
    id: 4,
    text: 'https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c'
  },
  {
    id: 5,
    text: 'https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281'
  },
  {
    id: 6,
    text: 'https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09'
  },
  {
    id: 7,
    text: 'https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06'
  },
  {
    id: 8,
    text: 'https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492'
  }
]
const footerExpress: Omit<DataFooter, 'icon' | 'link'>[] = [
  {
    id: 1,
    text: 'https://down-vn.img.susercontent.com/file/vn-50009109-159200e3e365de418aae52b840f24185'
  },
  {
    id: 2,
    text: 'https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2'
  },
  {
    id: 3,
    text: 'https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15'
  },
  {
    id: 4,
    text: 'https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f'
  },
  {
    id: 5,
    text: 'https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c'
  },
  {
    id: 6,
    text: 'https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63'
  },
  {
    id: 7,
    text: 'https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5'
  },
  {
    id: 8,
    text: 'https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d'
  },
  {
    id: 9,
    text: 'https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63'
  },
  {
    id: 10,
    text: 'https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6'
  },
  {
    id: 11,
    text: 'https://down-vn.img.susercontent.com/file/vn-50009109-ec3ae587db6309b791b78eb8af6793fd'
  }
]
const footerSocial: DataFooter[] = [
  {
    id: 1,
    text: 'Facebook',
    icon: BsFacebook,
    link: 'https://www.facebook.com/ajincome.7'
  },
  {
    id: 2,
    text: 'Instagram',
    icon: AiFillInstagram,
    link: 'https://www.instagram.com/jh.tu7egend'
  },
  {
    id: 3,
    text: 'Twitter',
    icon: AiFillTwitterCircle,
    link: 'https://twitter.com/cr7egend_2606'
  }
]
const footerApp: Omit<DataFooter, 'icon' | 'link'>[] = [
  {
    id: 1,
    text: 'https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163'
  },
  {
    id: 2,
    text: 'https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def'
  },
  {
    id: 3,
    text: 'https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0'
  }
]
export default { footerTakeCare, footerAboutShopee, footerPay, footerExpress, footerSocial, footerApp }
