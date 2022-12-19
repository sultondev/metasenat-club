export const telAndSumMask = {
    tel: {
        mask: "## ###-##-##",
    },
    sums: {
        mask: (value: any) => value.length > 9 ? "## ### ###" : "# ### ###"
    }
}