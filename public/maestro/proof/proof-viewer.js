(function(){
  var rawUrl = "/maestro/proof/coordination-ledger-v5.md";
  var textEl = document.getElementById("ledgerText");
  var statusEl = document.getElementById("ledgerStatus");
  var metricsEl = document.getElementById("ledgerMetrics");
  var progressEl = document.getElementById("pageProgress");
  var copyButton = document.getElementById("copyRawLink");

  function formatNumber(value){
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function updateProgress(){
    if(!progressEl) return;
    var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var pct = Math.max(0, Math.min(100, (scrollTop / max) * 100));
    progressEl.style.height = pct + "%";
  }

  function setText(text){
    textEl.textContent = text;
    var lines = text.split(/\r\n|\n|\r/).length;
    var bytes = new Blob([text]).size;
    var marks = text.match(/#M7-\d{3}/g) || [];
    var unique = {};
    marks.forEach(function(mark){ unique[mark] = true; });
    var uniqueMarks = Object.keys(unique).length;
    statusEl.textContent = "Loaded from the preserved Markdown artifact.";
    metricsEl.textContent = formatNumber(lines) + " lines / " + formatNumber(bytes) + " bytes / " + uniqueMarks + " unique M7 marks";
    updateProgress();
  }

  fetch(rawUrl, { cache: "no-store" })
    .then(function(response){
      if(!response.ok) throw new Error("Could not load artifact");
      return response.text();
    })
    .then(setText)
    .catch(function(error){
      textEl.textContent = "The proof artifact could not be loaded here. Open the raw Markdown file instead:\n" + rawUrl;
      statusEl.textContent = error.message;
    });

  if(copyButton){
    copyButton.addEventListener("click", function(){
      var href = window.location.origin + rawUrl;
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(href).then(function(){
          copyButton.textContent = "Copied";
          window.setTimeout(function(){ copyButton.textContent = "Copy raw link"; }, 1400);
        });
      } else {
        window.prompt("Copy raw link", href);
      }
    });
  }

  window.addEventListener("scroll", updateProgress, { passive:true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}());
