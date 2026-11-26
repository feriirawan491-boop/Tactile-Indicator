export const materialEducation: Record<
  string,
  { appearance: string; description: string; checks: string[] }
> = {
  beton: {
    appearance: "Kuning dengan tekstur berbutir pada gambar referensi.",
    description:
      "Contoh bentuk ubin modular beton pracetak. Visual memperlihatkan bidang persegi dengan pola timbul menyatu pada permukaan, agar bentuk guiding dan warning mudah dibandingkan.",
    checks: [
      "Dimensi dan ketebalan modul terhadap rancangan jalur.",
      "Kondisi lapisan dasar dan metode pemasangan yang ditentukan proyek.",
      "Warna, hasil akhir, serta kebutuhan jumlah dari data produk resmi.",
    ],
  },
  "stainless-steel": {
    appearance: "Stainless steel dalam bentuk pelat atau komponen individual.",
    description: "Bedakan bentuk dan finishing sebelum menentukan pilihan.",
    checks: [
      "Periksa grade material per listing.",
      "Konfirmasikan dimensi dan sistem pemasangan per model.",
    ],
  },
  polyurethane: {
    appearance: "Kuning dengan permukaan matte pada ilustrasi.",
    description:
      "Contoh bentuk ubin polyurethane berpola titik. Warna kuning pada visual hanya membantu mengenali tampilan contoh dan tidak menyatakan ketersediaan warna atau kecocokan suatu lokasi.",
    checks: [
      "Dimensi, pilihan warna, dan bentuk modul yang tersedia.",
      "Kompatibilitas material dengan permukaan dasar serta sistem perekat.",
      "Data penggunaan dan perawatan dari pemasok sebelum menentukan area.",
    ],
  },
};
