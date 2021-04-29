import { computed } from "vue";

export default function useSubmitBtnState(user) {
  const isBtnDisabled = computed(() => {
    let disabled = true;

    for (let prop in user) {
      if (!user[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });
  return { isBtnDisabled };
}
