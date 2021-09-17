import { ViewStyle, TextStyle } from "@hummer/hummer-front"
import { Color } from "./CommonColor"

const FullParentStyle: ViewStyle = {
    width: '100%',
    height: '100%',
}

const CenterStyle: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
}

const SmallTextStyle: TextStyle = {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
}

const RectItemStyle: ViewStyle = {
    width: 80,
    height: 40,
    backgroundColor: Color.hm_green,
    margin: 4,
}

const SquareItemStyle: ViewStyle = {
    width: 40,
    height: 40,
    backgroundColor: Color.hm_green,
    margin: 4,
}

const RoundItemStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Color.hm_green,
    margin: 4,
}

const CircleItemStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.hm_green,
    margin: 4,
}

const SelectColorItemStyle: ViewStyle = {
    width: 36,
    height: 24,
    marginTop: 6,
    marginBottom: 6,
}

const SelectSquareItemStyle: ViewStyle = {
    width: 30,
    height: 30,
    margin: 4,
    backgroundColor: Color.hm_green,
}

const SelectTextItemStyle: TextStyle = {
    minWidth: 44,
    height: 24,
    margin: 6,
    fontSize: 12,
    color: Color.black,
    textAlign: 'center',
}

const SelectColorTextItemStyle: TextStyle = {
    minWidth: 44,
    height: 24,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: Color.hm_green + '20',
    fontSize: 12,
    color: Color.black,
    textAlign: 'center',
}

const ItemBorderStyle: ViewStyle = {
    borderWidth: 2,
    borderColor: Color.black,
}

const ItemBorderLeftStyle: ViewStyle = {
    borderLeftWidth: 2,
    borderLeftColor: Color.black,
}

const ItemBorderTopStyle: ViewStyle = {
    borderTopWidth: 2,
    borderTopColor: Color.black,
}

const ItemBorderRightStyle: ViewStyle = {
    borderRightWidth: 2,
    borderRightColor: Color.black,
}

const ItemBorderBottomStyle: ViewStyle = {
    borderBottomWidth: 2,
    borderBottomColor: Color.black,
}

const ItemShadowStyle: ViewStyle = {
    shadow: '2 2 5 #000000',
}

export const Style = {
    FullParentStyle,
    CenterStyle,
    SmallTextStyle,
    RectItemStyle,
    SquareItemStyle,
    RoundItemStyle,
    CircleItemStyle,
    SelectColorItemStyle,
    SelectSquareItemStyle,
    SelectTextItemStyle,
    SelectColorTextItemStyle,
    ItemBorderStyle,
    ItemBorderLeftStyle,
    ItemBorderTopStyle,
    ItemBorderRightStyle,
    ItemBorderBottomStyle,
    ItemShadowStyle,
}