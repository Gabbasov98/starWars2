// src/composables/useFetch.js
import { ref } from "vue";

export function useFetch() {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchApi = async (url, options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Ошибка " + res.status);

      const json = await res.json();
      data.value = json;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // ВАЖНО: вернуть ИМЕННО САМУ ФУНКЦИЮ, без скобок
  return { data, error, loading, fetchApi };
}
