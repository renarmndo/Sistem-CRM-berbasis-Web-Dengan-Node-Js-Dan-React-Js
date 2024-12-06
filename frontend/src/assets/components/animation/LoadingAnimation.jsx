import LoadingOverlay from "react-loading-overlay";
import { BounceLoader } from "react-spinners";
import { useState } from "react";

const LoadingAnimation = () => {
  const [loading, setLoading] = useState(false);

  const handleProcess = () => {
    setLoading(true);
    // Proses loading berjalan di sini (mis. fetch data, dll)
    setTimeout(() => {
      setLoading(false); // Nonaktifkan loading setelah proses selesai
    }, 3000); // Misalnya loading berlangsung selama 3 detik
  };

  return (
    <div>
      <button onClick={handleProcess} className="btn btn-primary">
        Proses
      </button>
      <LoadingOverlay
        active={loading} // Menampilkan overlay loading jika loading=true
        spinner={<BounceLoader color="#FFC107" />}
        text="Loading..."
        styles={{
          overlay: (base) => ({
            ...base,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Warna latar belakang overlay
          }),
        }}
      >
        {/* Konten halaman atau komponen lainnya */}
        <div className="p-4 bg-white shadow rounded">Konten halaman ini</div>
      </LoadingOverlay>
    </div>
  );
};

export default LoadingAnimation;
