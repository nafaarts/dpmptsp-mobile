export default function tipePengaduan(kategori) {
    switch (kategori) {
        case 'sip_sik':
            $title = "SIP/SIK"
            break

        case 'oss_rba':
            $title = "OSS/RBA"
            break

        case 'imb_pbg':
            $title = "IMB/PBG"
            break

        case 'reklame':
            $title = "Reklame"
            break

        default:
            $title = 'Lainnya'
            break
    }

    return $title
}