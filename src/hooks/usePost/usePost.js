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
        method: "POST", //HTTP isteğinin yöntemi. Sunucuya veri göndermek için post kullanılır 
        headers: {
          "Content-Type": "application/json", //İstek başlıkları. JSON verisi gönderildiğini belirtir.
        },
        body: JSON.stringify(data), //Gövde kısmında gönderilen veriyi belirtir. Data nesnesi JSON formatına dönüştürülür, isteğin gövdesine eklenir
      });

      const text = await res.text(); //Ham yanıtı al. HTML FORMATINDA DÖNDÜĞÜNE DAİR HATA ALMIŞTIM
      console.log("Sunucu yanıtı:", text);

      const result = JSON.parse(text); //JSON.parse ile dönüşüm yapmayı dene
      //Başarılı yanıtları almak için res.ok true olacak. 

      if (res.ok) {
        setResponse(result); //Yanıt başarılıysa response'u ayarla
      } else {
        const errorMessage = errorMessages[res.status] || result.message || "Bir hata oluştu.";
        throw new Error(errorMessage);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, post };
}

export default usePost;

/*
res.ok: Yanıtın başarılı olup olmadığını kontrol eder. Başarılı yanıtlar genellikle HTTP durum kodları 200-299 arasında olur.
throw new Error(): Eğer yanıt başarılı değilse, hata mesajını fırlatır.
*/
