import React, { useState } from "react";

function usePost(errorMessages = {}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (url, data) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const text = await res.text(); // Ham yanıtı al
      console.log("Sunucu yanıtı:", text); // Yanıtı konsola yazdır

      const result = JSON.parse(text); // JSON formatına dönüştür
      
      
       
      
      if (res.ok) {
        setResponse(result); // Yanıt başarılıysa
      } else {
        // Hata durumunda uygun mesajı ayarla
        const errorMessage = errorMessages[res.status] || result.message || "Bir hata oluştu.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message); // Hata mesajını ayarla
    } finally {
      setLoading(false); // Yükleniyor durumunu kapat
    }
  };

  return { response, loading, error, post };
}

export default usePost;
