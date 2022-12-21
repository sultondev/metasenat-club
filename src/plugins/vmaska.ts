export const telAndSumMask = {
    tel: {
        mask: "## ###-##-##",
    },
    sums: {
        mask: (value: any) => {
            if (value.length === 7) return "### ###"
            else if (value.length === 6) return "## ###"
            else if (value.length === 9) return "# ### ###"
            else if (value.length > 9) return "## ### ###"
            else return "# ### ###"
        }
    }
}