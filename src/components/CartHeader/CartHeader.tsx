import { useSearchProduct } from '~/hooks/useSearchProduct'
import { path } from '~/constants/path'
import { NavHeader } from '../NavHeader'
import { Link } from 'react-router-dom'
import { InputSearch } from '../Input'
import { HiOutlineSearch } from 'react-icons/hi'
import { Button } from '../Button'

const CartHeader = () => {
  const { handleSearch, register, handleSubmit } = useSearchProduct()
  return (
    <>
      <div className='py-3 text-white bg-gradient-to-b from-cyan-500 to-blue-400'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className='py-4 bg-white border-b border-b-grayBox'>
        <div className='container flex flex-col justify-between gap-3 md:items-center md:flex-row md:gap-0'>
          <div className='flex items-end gap-4'>
            <Link to={path.HOME}>
              <svg className='h-8 md:h-11' viewBox='0 0 296 84' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M114.297 43.9134C114.183 42.9048 113.714 42.1236 112.891 41.5696C112.067 41.0085 111.03 40.728 109.78 40.728C108.885 40.728 108.111 40.87 107.457 41.1541C106.804 41.4311 106.296 41.8146 105.934 42.3047C105.579 42.7876 105.401 43.3381 105.401 43.956C105.401 44.4744 105.522 44.9219 105.763 45.2983C106.012 45.6747 106.335 45.9908 106.733 46.2464C107.138 46.495 107.571 46.7045 108.033 46.875C108.494 47.0384 108.938 47.1733 109.364 47.2798L111.495 47.8338C112.191 48.0043 112.905 48.2351 113.636 48.5263C114.368 48.8175 115.046 49.201 115.671 49.6768C116.296 50.1527 116.8 50.7422 117.184 51.4453C117.575 52.1484 117.77 52.9901 117.77 53.9702C117.77 55.206 117.45 56.3033 116.811 57.2621C116.179 58.2209 115.259 58.9773 114.052 59.5312C112.852 60.0852 111.399 60.3622 109.695 60.3622C108.061 60.3622 106.648 60.103 105.455 59.5845C104.261 59.0661 103.327 58.331 102.653 57.3793C101.978 56.4205 101.605 55.2841 101.534 53.9702H104.837C104.901 54.7585 105.156 55.4155 105.604 55.9411C106.058 56.4595 106.637 56.8466 107.34 57.1023C108.05 57.3509 108.828 57.4751 109.673 57.4751C110.604 57.4751 111.431 57.3295 112.156 57.0384C112.887 56.7401 113.462 56.3281 113.881 55.8026C114.3 55.2699 114.51 54.6484 114.51 53.9382C114.51 53.2919 114.325 52.7628 113.956 52.3509C113.594 51.9389 113.1 51.598 112.475 51.3281C111.857 51.0582 111.158 50.8203 110.376 50.6143L107.798 49.9112C106.051 49.4354 104.666 48.7358 103.643 47.8125C102.628 46.8892 102.12 45.6676 102.12 44.1477C102.12 42.8906 102.461 41.7933 103.143 40.8558C103.825 39.9183 104.748 39.1903 105.913 38.6719C107.077 38.1463 108.391 37.8835 109.854 37.8835C111.332 37.8835 112.635 38.1428 113.764 38.6612C114.901 39.1797 115.795 39.8935 116.449 40.8026C117.102 41.7045 117.443 42.7415 117.472 43.9134H114.297ZM124.633 50.2841V60H121.448V38.1818H124.591V46.2997H124.793C125.177 45.419 125.763 44.7195 126.551 44.201C127.339 43.6825 128.369 43.4233 129.64 43.4233C130.763 43.4233 131.743 43.6541 132.581 44.1158C133.426 44.5774 134.079 45.2663 134.541 46.1825C135.01 47.0916 135.244 48.228 135.244 49.5916V60H132.059V49.9751C132.059 48.7749 131.75 47.8445 131.132 47.1839C130.514 46.5163 129.655 46.1825 128.554 46.1825C127.801 46.1825 127.126 46.3423 126.53 46.6619C125.94 46.9815 125.475 47.4503 125.134 48.0682C124.8 48.679 124.633 49.4176 124.633 50.2841ZM146.388 60.3303C144.854 60.3303 143.515 59.9787 142.371 59.2756C141.228 58.5724 140.34 57.5888 139.708 56.3246C139.076 55.0604 138.76 53.5831 138.76 51.8928C138.76 50.1953 139.076 48.7109 139.708 47.4396C140.34 46.1683 141.228 45.1811 142.371 44.478C143.515 43.7749 144.854 43.4233 146.388 43.4233C147.922 43.4233 149.26 43.7749 150.404 44.478C151.547 45.1811 152.435 46.1683 153.067 47.4396C153.699 48.7109 154.015 50.1953 154.015 51.8928C154.015 53.5831 153.699 55.0604 153.067 56.3246C152.435 57.5888 151.547 58.5724 150.404 59.2756C149.26 59.9787 147.922 60.3303 146.388 60.3303ZM146.398 57.6562C147.393 57.6562 148.216 57.3935 148.87 56.8679C149.523 56.3423 150.006 55.6428 150.319 54.7692C150.638 53.8956 150.798 52.9332 150.798 51.8821C150.798 50.8381 150.638 49.8793 150.319 49.0057C150.006 48.125 149.523 47.4183 148.87 46.8857C148.216 46.353 147.393 46.0866 146.398 46.0866C145.397 46.0866 144.566 46.353 143.905 46.8857C143.252 47.4183 142.765 48.125 142.446 49.0057C142.133 49.8793 141.977 50.8381 141.977 51.8821C141.977 52.9332 142.133 53.8956 142.446 54.7692C142.765 55.6428 143.252 56.3423 143.905 56.8679C144.566 57.3935 145.397 57.6562 146.398 57.6562ZM157.571 66.1364V43.6364H160.682V46.2891H160.948C161.133 45.9482 161.399 45.554 161.747 45.1065C162.095 44.6591 162.578 44.2685 163.196 43.9347C163.814 43.5938 164.631 43.4233 165.646 43.4233C166.967 43.4233 168.146 43.7571 169.183 44.4247C170.22 45.0923 171.033 46.0547 171.623 47.3118C172.219 48.5689 172.518 50.0817 172.518 51.8501C172.518 53.6186 172.223 55.1349 171.634 56.3991C171.044 57.6562 170.234 58.6257 169.205 59.3075C168.175 59.9822 166.999 60.3196 165.678 60.3196C164.684 60.3196 163.871 60.1527 163.239 59.8189C162.614 59.4851 162.124 59.0945 161.768 58.647C161.413 58.1996 161.14 57.8018 160.948 57.4538H160.756V66.1364H157.571ZM160.692 51.8182C160.692 52.9687 160.859 53.9773 161.193 54.8438C161.527 55.7102 162.01 56.3885 162.642 56.8786C163.274 57.3615 164.048 57.603 164.964 57.603C165.916 57.603 166.712 57.3509 167.351 56.8466C167.99 56.3352 168.473 55.6428 168.8 54.7692C169.134 53.8956 169.3 52.9119 169.3 51.8182C169.3 50.7386 169.137 49.7692 168.81 48.9098C168.491 48.0504 168.008 47.3722 167.362 46.875C166.722 46.3778 165.923 46.1293 164.964 46.1293C164.041 46.1293 163.26 46.3672 162.621 46.843C161.989 47.3189 161.509 47.983 161.183 48.8352C160.856 49.6875 160.692 50.6818 160.692 51.8182ZM183.139 60.3303C181.527 60.3303 180.138 59.9858 178.974 59.2969C177.816 58.6009 176.921 57.6243 176.289 56.3672C175.664 55.103 175.352 53.6222 175.352 51.9247C175.352 50.2486 175.664 48.7713 176.289 47.4929C176.921 46.2145 177.802 45.2166 178.931 44.4993C180.067 43.782 181.396 43.4233 182.915 43.4233C183.839 43.4233 184.734 43.576 185.6 43.8814C186.467 44.1868 187.244 44.6662 187.933 45.3196C188.622 45.973 189.165 46.8217 189.563 47.8658C189.961 48.9027 190.16 50.1634 190.16 51.6477V52.777H177.152V50.3906H187.038C187.038 49.5526 186.868 48.8104 186.527 48.1641C186.186 47.5107 185.707 46.9957 185.089 46.6193C184.478 46.2429 183.761 46.0547 182.937 46.0547C182.042 46.0547 181.261 46.2749 180.593 46.7152C179.933 47.1484 179.421 47.7166 179.059 48.4197C178.704 49.1158 178.526 49.8722 178.526 50.6889V52.5533C178.526 53.647 178.718 54.5774 179.102 55.3445C179.492 56.1115 180.036 56.6974 180.732 57.1023C181.428 57.5 182.241 57.6989 183.171 57.6989C183.775 57.6989 184.325 57.6136 184.822 57.4432C185.32 57.2656 185.749 57.0028 186.112 56.6548C186.474 56.3068 186.751 55.8771 186.942 55.3658L189.957 55.9091C189.716 56.7969 189.283 57.5746 188.658 58.2422C188.04 58.9027 187.262 59.4176 186.325 59.7869C185.394 60.1491 184.332 60.3303 183.139 60.3303ZM200.747 60.3303C199.134 60.3303 197.746 59.9858 196.581 59.2969C195.423 58.6009 194.529 57.6243 193.896 56.3672C193.271 55.103 192.959 53.6222 192.959 51.9247C192.959 50.2486 193.271 48.7713 193.896 47.4929C194.529 46.2145 195.409 45.2166 196.539 44.4993C197.675 43.782 199.003 43.4233 200.523 43.4233C201.446 43.4233 202.341 43.576 203.208 43.8814C204.074 44.1868 204.852 44.6662 205.541 45.3196C206.23 45.973 206.773 46.8217 207.171 47.8658C207.568 48.9027 207.767 50.1634 207.767 51.6477V52.777H194.759V50.3906H204.646C204.646 49.5526 204.475 48.8104 204.134 48.1641C203.794 47.5107 203.314 46.9957 202.696 46.6193C202.085 46.2429 201.368 46.0547 200.544 46.0547C199.649 46.0547 198.868 46.2749 198.2 46.7152C197.54 47.1484 197.029 47.7166 196.666 48.4197C196.311 49.1158 196.134 49.8722 196.134 50.6889V52.5533C196.134 53.647 196.325 54.5774 196.709 55.3445C197.1 56.1115 197.643 56.6974 198.339 57.1023C199.035 57.5 199.848 57.6989 200.779 57.6989C201.382 57.6989 201.933 57.6136 202.43 57.4432C202.927 57.2656 203.357 57.0028 203.719 56.6548C204.081 56.3068 204.358 55.8771 204.55 55.3658L207.565 55.9091C207.323 56.7969 206.89 57.5746 206.265 58.2422C205.647 58.9027 204.869 59.4176 203.932 59.7869C203.002 60.1491 201.94 60.3303 200.747 60.3303ZM226.134 60.3303C224.55 60.3303 223.186 59.9716 222.043 59.2543C220.906 58.5298 220.033 57.532 219.422 56.2607C218.811 54.9893 218.506 53.5334 218.506 51.8928C218.506 50.2308 218.818 48.7642 219.443 47.4929C220.068 46.2145 220.949 45.2166 222.085 44.4993C223.222 43.782 224.561 43.4233 226.102 43.4233C227.345 43.4233 228.453 43.6541 229.426 44.1158C230.399 44.5703 231.183 45.2095 231.78 46.0334C232.384 46.8572 232.742 47.8196 232.856 48.9205H229.756C229.585 48.1534 229.195 47.4929 228.584 46.9389C227.98 46.3849 227.171 46.108 226.155 46.108C225.267 46.108 224.49 46.3423 223.822 46.8111C223.161 47.2727 222.646 47.9332 222.277 48.7926C221.908 49.6449 221.723 50.6534 221.723 51.8182C221.723 53.0114 221.904 54.0412 222.267 54.9077C222.629 55.7741 223.14 56.4453 223.801 56.9212C224.468 57.397 225.253 57.6349 226.155 57.6349C226.759 57.6349 227.306 57.5249 227.796 57.3047C228.293 57.0774 228.708 56.7543 229.042 56.3352C229.383 55.9162 229.621 55.4119 229.756 54.8224H232.856C232.742 55.8807 232.398 56.8253 231.823 57.6562C231.247 58.4872 230.477 59.1406 229.511 59.6165C228.552 60.0923 227.426 60.3303 226.134 60.3303ZM239.448 38.1818V60H236.262V38.1818H239.448ZM250.626 60.3303C249.092 60.3303 247.753 59.9787 246.61 59.2756C245.466 58.5724 244.578 57.5888 243.946 56.3246C243.314 55.0604 242.998 53.5831 242.998 51.8928C242.998 50.1953 243.314 48.7109 243.946 47.4396C244.578 46.1683 245.466 45.1811 246.61 44.478C247.753 43.7749 249.092 43.4233 250.626 43.4233C252.16 43.4233 253.499 43.7749 254.642 44.478C255.786 45.1811 256.673 46.1683 257.306 47.4396C257.938 48.7109 258.254 50.1953 258.254 51.8928C258.254 53.5831 257.938 55.0604 257.306 56.3246C256.673 57.5888 255.786 58.5724 254.642 59.2756C253.499 59.9787 252.16 60.3303 250.626 60.3303ZM250.637 57.6562C251.631 57.6562 252.455 57.3935 253.108 56.8679C253.762 56.3423 254.244 55.6428 254.557 54.7692C254.877 53.8956 255.036 52.9332 255.036 51.8821C255.036 50.8381 254.877 49.8793 254.557 49.0057C254.244 48.125 253.762 47.4183 253.108 46.8857C252.455 46.353 251.631 46.0866 250.637 46.0866C249.635 46.0866 248.804 46.353 248.144 46.8857C247.49 47.4183 247.004 48.125 246.684 49.0057C246.372 49.8793 246.215 50.8381 246.215 51.8821C246.215 52.9332 246.372 53.8956 246.684 54.7692C247.004 55.6428 247.49 56.3423 248.144 56.8679C248.804 57.3935 249.635 57.6562 250.637 57.6562ZM264.995 50.2841V60H261.809V43.6364H264.867V46.2997H265.069C265.446 45.4332 266.035 44.7372 266.838 44.2116C267.647 43.6861 268.667 43.4233 269.895 43.4233C271.01 43.4233 271.987 43.6577 272.825 44.1264C273.663 44.5881 274.313 45.277 274.775 46.1932C275.236 47.1094 275.467 48.2422 275.467 49.5916V60H272.282V49.9751C272.282 48.7891 271.973 47.8622 271.355 47.1946C270.737 46.5199 269.888 46.1825 268.809 46.1825C268.07 46.1825 267.413 46.3423 266.838 46.6619C266.27 46.9815 265.819 47.4503 265.485 48.0682C265.158 48.679 264.995 49.4176 264.995 50.2841ZM286.792 60.3303C285.179 60.3303 283.791 59.9858 282.626 59.2969C281.468 58.6009 280.574 57.6243 279.941 56.3672C279.316 55.103 279.004 53.6222 279.004 51.9247C279.004 50.2486 279.316 48.7713 279.941 47.4929C280.574 46.2145 281.454 45.2166 282.583 44.4993C283.72 43.782 285.048 43.4233 286.568 43.4233C287.491 43.4233 288.386 43.576 289.252 43.8814C290.119 44.1868 290.897 44.6662 291.586 45.3196C292.275 45.973 292.818 46.8217 293.216 47.8658C293.613 48.9027 293.812 50.1634 293.812 51.6477V52.777H280.804V50.3906H290.691C290.691 49.5526 290.52 48.8104 290.179 48.1641C289.838 47.5107 289.359 46.9957 288.741 46.6193C288.13 46.2429 287.413 46.0547 286.589 46.0547C285.694 46.0547 284.913 46.2749 284.245 46.7152C283.585 47.1484 283.074 47.7166 282.711 48.4197C282.356 49.1158 282.179 49.8722 282.179 50.6889V52.5533C282.179 53.647 282.37 54.5774 282.754 55.3445C283.145 56.1115 283.688 56.6974 284.384 57.1023C285.08 57.5 285.893 57.6989 286.824 57.6989C287.427 57.6989 287.978 57.6136 288.475 57.4432C288.972 57.2656 289.402 57.0028 289.764 56.6548C290.126 56.3068 290.403 55.8771 290.595 55.3658L293.61 55.9091C293.368 56.7969 292.935 57.5746 292.31 58.2422C291.692 58.9027 290.914 59.4176 289.977 59.7869C289.047 60.1491 287.985 60.3303 286.792 60.3303Z'
                  fill='#0891b2'
                ></path>
                <path
                  d='M48.75 3.35415C49.1443 3.18208 49.5698 3.09326 50 3.09326C50.4302 3.09326 50.8557 3.18208 51.25 3.35415C66.6586 10.0892 81.3564 18.3454 95.125 28C95.6102 28.3403 95.9887 28.8115 96.2162 29.3587C96.4438 29.9059 96.511 30.5066 96.4101 31.0906C96.3092 31.6746 96.0443 32.2178 95.6464 32.657C95.2484 33.0961 94.7338 33.4131 94.1625 33.5708C79.8683 37.5187 66.0369 42.9831 52.9042 49.8708L52.8917 49.8791L51.475 50.6291C51.0218 50.8713 50.5159 50.998 50.0021 50.998C49.4882 50.998 48.9823 50.8713 48.5292 50.6291C42.8987 47.6201 37.1329 44.8713 31.25 42.3917V41.4583C31.25 40.9125 31.5292 40.425 31.9667 40.1625C38.2557 36.3513 44.7258 32.8472 51.3542 29.6625C52.1012 29.3033 52.675 28.6621 52.9492 27.88C53.2235 27.0978 53.1758 26.2387 52.8167 25.4917C52.4575 24.7446 51.8163 24.1709 51.0341 23.8966C50.252 23.6223 49.3929 23.67 48.6458 24.0292C41.8366 27.3012 35.1899 30.9012 28.7292 34.8167C27.81 35.3743 27.0171 36.1172 26.4008 36.9981C25.7846 37.8791 25.3586 38.8787 25.15 39.9333C18.8217 37.4983 12.3779 35.3749 5.84167 33.5708C5.2704 33.4131 4.75576 33.0961 4.3578 32.657C3.95984 32.2178 3.69496 31.6746 3.59406 31.0906C3.49316 30.5066 3.5604 29.9059 3.78794 29.3587C4.01549 28.8115 4.39394 28.3403 4.87917 28C18.6464 18.3457 33.3429 10.0895 48.75 3.35415Z'
                  fill='#0891b2'
                ></path>
                <path
                  d='M54.4167 56.1375C64.6511 50.6697 75.3379 46.0944 86.3583 42.4625C86.9167 48.3542 87.275 54.3083 87.4208 60.3167C87.4361 60.9454 87.2614 61.5641 86.9194 62.0919C86.5775 62.6197 86.0842 63.032 85.5042 63.275C73.6929 68.2082 62.3838 74.2667 51.7333 81.3667C51.22 81.7089 50.6169 81.8915 50 81.8915C49.3831 81.8915 48.78 81.7089 48.2667 81.3667C37.6175 74.2669 26.3099 68.2084 14.5 63.275C13.9192 63.0327 13.425 62.6206 13.0823 62.0928C12.7396 61.5649 12.5642 60.9459 12.5792 60.3167C12.725 54.3083 13.0833 48.3583 13.6417 42.4583C17.4681 43.7196 21.2559 45.0952 25 46.5833V51.875C24.0997 52.3937 23.343 53.1287 22.7982 54.0134C22.2534 54.8981 21.9378 55.9047 21.8799 56.9421C21.822 57.9795 22.0236 59.015 22.4665 59.9549C22.9095 60.8947 23.5797 61.7093 24.4167 62.325C24.0417 63.9083 23.4917 65.4625 22.7625 66.95C24.6458 67.8375 26.5167 68.7583 28.3708 69.7042C29.4162 67.5769 30.1877 65.3256 30.6667 63.0042C31.7203 62.5357 32.6239 61.7848 33.2773 60.8346C33.9307 59.8845 34.3085 58.7721 34.3689 57.6205C34.4292 56.4689 34.1699 55.3231 33.6194 54.3098C33.069 53.2965 32.2489 52.4553 31.25 51.8792V49.1917C36.1172 51.3193 40.8987 53.6377 45.5833 56.1417C46.9423 56.8675 48.4593 57.2472 50 57.2472C51.5407 57.2472 53.0576 56.8675 54.4167 56.1417V56.1375Z'
                  fill='#0891b2'
                ></path>
                <path
                  d='M18.5917 72.7583C20.3417 71.0125 21.7292 69.05 22.7583 66.95C24.6458 67.8375 26.5167 68.7583 28.3708 69.7042C27.0074 72.4733 25.1971 74.9988 23.0125 77.1792C22.7264 77.4862 22.3814 77.7325 21.9981 77.9033C21.6148 78.0741 21.2009 78.1659 20.7814 78.1733C20.3618 78.1807 19.945 78.1035 19.5559 77.9464C19.1667 77.7892 18.8133 77.5552 18.5165 77.2585C18.2198 76.9618 17.9858 76.6083 17.8287 76.2192C17.6715 75.83 17.5943 75.4133 17.6017 74.9937C17.6091 74.5741 17.701 74.1603 17.8718 73.7769C18.0426 73.3936 18.2888 73.0486 18.5958 72.7625L18.5917 72.7583Z'
                  fill='#0891b2'
                ></path>
              </svg>
            </Link>
            <span className='relative pl-4 border-l bottom-1 border-l-primary text-primary md:text-xl'>Giỏ hàng</span>
          </div>
          <form onSubmit={handleSubmit(handleSearch)} className='relative w-full md:w-1/2'>
            <InputSearch
              className='py-3 pl-4 pr-16 border-[2px] bg-white border-blue-400 text-grayDark placeholder:uppercase focus:border-third rounded-none'
              name='searchValue'
              placeholder='Free Ship Đơn từ 0đ'
              register={register}
            />
            <Button type='submit' className='absolute top-0 right-0 h-full px-4 rounded-none'>
              <HiOutlineSearch size={20} />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CartHeader
