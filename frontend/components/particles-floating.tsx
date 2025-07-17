const styles = [
  {
    left: "91.2361943703909%",
    top: "19.32994850378531%",
    animation: "float 6.671571348036773s ease-in-out infinite",
    animationDelay: "0.6913179196213217s",
  },
  {
    left: "20.320493286176045%",
    top: "58.5642096391352%",
    animation: "float 3.1083133947637798s ease-in-out infinite",
    animationDelay: "0.6960997079576523s",
  },
  {
    left: "37.99689108033937%",
    top: "52.64368944788389%",
    animation: "float 4.443517081234505s ease-in-out infinite",
    animationDelay: "0.8417388657997005s",
  },
  {
    left: "64.85223257206539%",
    top: "67.58692715051528%",
    animation: "float 3.2178516517235s ease-in-out infinite",
    animationDelay: "1.6486714966139049s",
  },
  {
    left: "9.818086392792335%",
    top: "29.10980585161943%",
    animation: "float 6.317837968354816s ease-in-out infinite",
    animationDelay: "1.3358369359590543s",
  },
  {
    left: "58.79610666004551%",
    top: "49.876824200226466%",
    animation: "float 5.522362366826579s ease-in-out infinite",
    animationDelay: "1.1788917259715361s",
  },
  {
    left: "34.99562060991311%",
    top: "90.40093692206722%",
    animation: "float 4.416474190079871s ease-in-out infinite",
    animationDelay: "0.9854230321093718s",
  },
  {
    left: "39.2606884248636%",
    top: "86.2454506762175%",
    animation: "float 3.8537977019800564s ease-in-out infinite",
    animationDelay: "0.8236345080727101s",
  },
  {
    left: "98.80958363568384%",
    top: "26.543508024182294%",
    animation: "float 4.217488264514731s ease-in-out infinite",
    animationDelay: "1.2010492306549518s",
  },
  {
    left: "89.22304139595428%",
    top: "31.40089724622027%",
    animation: "float 3.2086328143611054s ease-in-out infinite",
    animationDelay: "1.5198668536687667s",
  },
  {
    left: "72.1429999683149%",
    top: "48.18706519408872%",
    animation: "float 5.330893201473192s ease-in-out infinite",
    animationDelay: "0.16474771069167482s",
  },
  {
    left: "62.36982492589041%",
    top: "27.168820015843075%",
    animation: "float 4.616485948347186s ease-in-out infinite",
    animationDelay: "1.3882104338014563s",
  },
  {
    left: "72.33008667503057%",
    top: "81.26739079921077%",
    animation: "float 4.706480510704459s ease-in-out infinite",
    animationDelay: "1.776091901975569s",
  },
  {
    left: "35.65078774197309%",
    top: "30.931639263488997%",
    animation: "float 5.635177963977443s ease-in-out infinite",
    animationDelay: "1.1670611974974976s",
  },
  {
    left: "58.955963475816056%",
    top: "76.20705070879681%",
    animation: "float 3.981289586453977s ease-in-out infinite",
    animationDelay: "0.4513809123194539s",
  },
  {
    left: "20.18763072074047%",
    top: "73.80618707273477%",
    animation: "float 3.6323269142883925s ease-in-out infinite",
    animationDelay: "1.189219009777083s",
  },
  {
    left: "63.43370760513199%",
    top: "53.651376953954156%",
    animation: "float 3.0694619105859324s ease-in-out infinite",
    animationDelay: "1.4610448388017083s",
  },
  {
    left: "2.6041951895229176%",
    top: "47.89631102251396%",
    animation: "float 4.538029727241074s ease-in-out infinite",
    animationDelay: "1.2356544796917726s",
  },
  {
    left: "1.1330127075785734%",
    top: "34.4947310399811%",
    animation: "float 5.343478588993567s ease-in-out infinite",
    animationDelay: "1.4522730003283186s",
  },
  {
    left: "41.498568939834854%",
    top: "73.9003113921536%",
    animation: "float 4.708743442429537s ease-in-out infinite",
    animationDelay: "0.6452583101526066s",
  },
];

export function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-30"
          style={styles[i]}
        />
      ))}
    </div>
  );
}
