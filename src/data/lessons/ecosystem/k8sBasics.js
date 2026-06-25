export const k8sBasics = {
  id: "k8s-basics",
  title: "Kubernetes (K8s) Asoslari",
  language: "javascript",
  theory: `## 1. 💡 Sodda Tushuntirish
Kubernetes (K8s) — bu konteynerlashtirilgan ilovalarni avtomatlashtirilgan tarzda joylashtirish (deploy), masshtablash (scaling) va boshqarish tizimidir. Tasavvur qiling, sizda yuzlab konteynerlar bor va ularning qaysi biri ishlayotgani, qaysi biri o'chib qolganini qo'lda kuzatish imkonsiz. Kubernetes ularni kuzatadi, o'chib qolsa qayta yoqadi va ko'p foydalanuvchi kirganda avtomatik ravishda yangi nusxalarini yaratadi.

## ❌ YOMON va ✅ YAXSHI Yondashuvlar

❌ **YOMON (Qo'lda boshqarish)**:
- Har bir serverga kirib \`docker run\` qilish.
- Server o'chib qolsa, kechasi bilan turib uni qayta ishga tushirish.
- Yangi versiyani yuklashda saytni bir muddat o'chirib turish.

✅ **YAXSHI (Kubernetes bilan)**:
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: my-app:v2
\`\`\`
- Replicas orqali doim 3 ta nusxa ishlashini kafolatlaysiz.
- K8s o'z-o'zini davolaydi (self-healing), ya'ni pod qulasa yangisini yaratadi.
- Yangilanishlar (Rolling Updates) saytni uzib qo'ymasdan amalga oshiriladi.

## 🎤 Intervyu Savollari
1. **Pod nima?**
   - Javob: Pod - Kubernetes'dagi eng kichik joylashtirish (deploy) birligi. U bitta yoki bir nechta chambarchas bog'liq konteynerlarni o'z ichiga oladi.
2. **Deployment va Pod farqi nima?**
   - Javob: Pod o'tkinchi (ephemeral) bo'lib, o'lsa qayta tirilmaydi. Deployment esa Pod'larni boshqaradi, kerakli miqdorda ishlab turishini ta'minlaydi.
3. **Service nima uchun kerak?**
   - Javob: Pod'larning IP manzillari doim o'zgarib turadi. Service esa ularga bitta o'zgarmas IP va DNS nom beradi, bu orqali tarmoq trafigi to'g'ri yo'naltiriladi.

## 🛠️ Amaliy Topshiriqlar
\`\`\`mermaid
graph TD;
    U[Foydalanuvchi] --> I[Ingress];
    I --> S[Service];
    S --> P1[Pod 1];
    S --> P2[Pod 2];
    S --> P3[Pod 3];
\`\`\`
`,
  exercises: [
    {
      id: 1,
      title: "Replicas hisoblash",
      instruction: "`getTotalReplicas` funksiyasi deploymentlar obyektlari massivini qabul qiladi. Jami replicas sonini qaytaring.",
      startingCode: "function getTotalReplicas(deployments) {\n  // your code here\n}",
      hint: "reduce yoki loop ishlating, d.spec.replicas ni qo'shing",
      solution: "function getTotalReplicas(deployments) {\n  return deployments.reduce((sum, d) => sum + d.spec.replicas, 0);\n}",
      test: "const fn = new Function(code + '; return getTotalReplicas;')(); const r = fn([{spec:{replicas:2}}, {spec:{replicas:3}}]); if(r !== 5) throw new Error('Xato hisoblash');"
    },
    {
      id: 2,
      title: "Pod yaratuvchi funksiya",
      instruction: "`createPod` funksiyasi nom va image qabul qilib K8s pod obyekti strukturasini qaytarsin.",
      startingCode: "function createPod(name, image) {\n  return {\n    kind: 'Pod',\n    metadata: { name: name },\n    // spec va containers ni to'ldiring\n  };\n}",
      hint: "spec: { containers: [{ name, image }] }",
      solution: "function createPod(name, image) {\n  return { kind: 'Pod', metadata: { name }, spec: { containers: [{ name, image }] } };\n}",
      test: "const fn = new Function(code + '; return createPod;')(); const r = fn('app', 'nginx'); if(r.spec.containers[0].image !== 'nginx') throw new Error('Xato obyekt');"
    },
    {
      id: 3,
      title: "Label qo'shish",
      instruction: "`addLabel` funksiyasi K8s manifest (obyekt) va label obyektini (masalan { env: 'prod' }) qabul qilib, uni `metadata.labels` ichiga qo'shib qaytarsin.",
      startingCode: "function addLabel(manifest, label) {\n  // your code here\n}",
      hint: "manifest.metadata.labels = { ...manifest.metadata.labels, ...label }",
      solution: "function addLabel(manifest, label) {\n  if(!manifest.metadata.labels) manifest.metadata.labels = {};\n  manifest.metadata.labels = { ...manifest.metadata.labels, ...label };\n  return manifest;\n}",
      test: "const fn = new Function(code + '; return addLabel;')(); const r = fn({metadata:{}}, {tier:'frontend'}); if(r.metadata.labels.tier !== 'frontend') throw new Error('Label qoshilmadi');"
    },
    {
      id: 4,
      title: "Deployment Scale",
      instruction: "`scaleDeployment` funksiyasi deployment obyektini va yangi replica sonini qabul qilib, `spec.replicas` qiymatini o'zgartirsin va obyektni qaytarsin.",
      startingCode: "function scaleDeployment(deployment, replicas) {\n  // your code here\n}",
      hint: "deployment.spec.replicas = replicas;",
      solution: "function scaleDeployment(deployment, replicas) {\n  deployment.spec.replicas = replicas;\n  return deployment;\n}",
      test: "const fn = new Function(code + '; return scaleDeployment;')(); const r = fn({spec:{replicas:1}}, 5); if(r.spec.replicas !== 5) throw new Error('Scale ishlamadi');"
    },
    {
      id: 5,
      title: "Service obyekti",
      instruction: "`createService` app nomi va port qabul qilib, K8s Service obyektini qaytarsin.",
      startingCode: "function createService(app, port) {\n  // return { kind: 'Service', spec: { selector: { app }, ports: [{ port }] } }\n}",
      hint: "Izohdagi strukturani qaytaring",
      solution: "function createService(app, port) {\n  return { kind: 'Service', spec: { selector: { app }, ports: [{ port }] } };\n}",
      test: "const fn = new Function(code + '; return createService;')(); const r = fn('web', 80); if(r.spec.selector.app !== 'web' || r.spec.ports[0].port !== 80) throw new Error('Xato Service');"
    },
    {
      id: 6,
      title: "Pod statusini tekshirish",
      instruction: "`isPodRunning` funksiyasi pod obyekti (pod.status.phase) 'Running' bo'lsa true, aks holda false qaytarsin.",
      startingCode: "function isPodRunning(pod) {\n  // your code here\n}",
      hint: "return pod.status.phase === 'Running'",
      solution: "function isPodRunning(pod) {\n  return pod.status?.phase === 'Running';\n}",
      test: "const fn = new Function(code + '; return isPodRunning;')(); if(!fn({status:{phase:'Running'}}) || fn({status:{phase:'Pending'}})) throw new Error('Status tekshiruvi xato');"
    },
    {
      id: 7,
      title: "Image yangilash (Update)",
      instruction: "`updateImage` deployment obyekti va yangi image nomini olib, birinchi konteynerning imageni yangilasin.",
      startingCode: "function updateImage(deployment, newImage) {\n  // deployment.spec.template.spec.containers[0].image = newImage;\n}",
      hint: "Ichki obyekt yo'liga e'tibor bering.",
      solution: "function updateImage(deployment, newImage) {\n  deployment.spec.template.spec.containers[0].image = newImage;\n  return deployment;\n}",
      test: "const fn = new Function(code + '; return updateImage;')(); const r = fn({spec:{template:{spec:{containers:[{image:'v1'}]}}}}, 'v2'); if(r.spec.template.spec.containers[0].image !== 'v2') throw new Error('Image yangilanmadi');"
    },
    {
      id: 8,
      title: "Namespace ajratish",
      instruction: "`getNamespace` funksiyasi obyektni olib `metadata.namespace` ni qaytarsin. Agar yo'q bo'lsa 'default' qaytarsin.",
      startingCode: "function getNamespace(manifest) {\n  // your code here\n}",
      hint: "manifest.metadata.namespace || 'default'",
      solution: "function getNamespace(manifest) {\n  return manifest.metadata?.namespace || 'default';\n}",
      test: "const fn = new Function(code + '; return getNamespace;')(); if(fn({metadata:{}}) !== 'default' || fn({metadata:{namespace:'dev'}}) !== 'dev') throw new Error('Xato namespace');"
    },
    {
      id: 9,
      title: "ConfigMap Obyekti",
      instruction: "`createConfigMap` name va data obyektini qabul qilib, K8s ConfigMap qaytarsin.",
      startingCode: "function createConfigMap(name, data) {\n  // return { kind: 'ConfigMap', metadata: { name }, data }\n}",
      hint: "Faqat obyekt qaytarasiz.",
      solution: "function createConfigMap(name, data) {\n  return { kind: 'ConfigMap', metadata: { name }, data };\n}",
      test: "const fn = new Function(code + '; return createConfigMap;')(); const r = fn('app-conf', { key: 'val' }); if(r.kind !== 'ConfigMap' || r.data.key !== 'val') throw new Error('ConfigMap xato');"
    },
    {
      id: 10,
      title: "Resource limits",
      instruction: "`setMemoryLimit` pod.spec.containers[0] ichida resources.limits.memory ni belgilab qaytarsin.",
      startingCode: "function setMemoryLimit(pod, memory) {\n  // pod.spec.containers[0].resources = { limits: { memory } }\n}",
      hint: "Ko'rsatilgan yo'ldagi resources obyektini hosil qiling.",
      solution: "function setMemoryLimit(pod, memory) {\n  if(!pod.spec) pod.spec = {};\n  if(!pod.spec.containers) pod.spec.containers = [{}];\n  pod.spec.containers[0].resources = { limits: { memory } };\n  return pod;\n}",
      test: "const fn = new Function(code + '; return setMemoryLimit;')(); const r = fn({spec:{containers:[{}]}}, '256Mi'); if(r.spec.containers[0].resources.limits.memory !== '256Mi') throw new Error('Limits qoshilmadi');"
    }
  ],
  quizzes: [
    {
      id: 1,
      question: "Kubernetes'da eng kichik joylashtirish (deploy) birligi nima?",
      options: ["Container", "Pod", "Node", "Cluster"],
      correctAnswer: 1,
      explanation: "K8s da eng kichik birlik Pod bo'lib, u ichida bitta yoki bir nechta konteynerlarni saqlaydi."
    },
    {
      id: 2,
      question: "Pod'larning o'lsa ham kerakli miqdorda ishlashini nima ta'minlaydi?",
      options: ["Deployment (yoki ReplicaSet)", "Service", "Ingress", "ConfigMap"],
      correctAnswer: 0,
      explanation: "Deployment Pod'larni kuzatadi va kerakli 'replicas' miqdorini ushlab turadi."
    },
    {
      id: 3,
      question: "Pod'lar bilan barqaror aloqa qilish uchun nima ishlatiladi (o'zgarmas IP)?",
      options: ["Volume", "Deployment", "Service", "Secret"],
      correctAnswer: 2,
      explanation: "Service dinamik Pod'larni yig'ib bitta barqaror IP va DNS nom beradi."
    },
    {
      id: 4,
      question: "Kubectl nima?",
      options: ["Ma'lumotlar bazasi", "Kubernetes bilan muloqot qiluvchi CLI (buyruqlar satri) vositasi", "Bulutli xosting", "Dasturlash tili"],
      correctAnswer: 1,
      explanation: "kubectl orqali siz Kubernetes klasteriga komandalar yuborasiz."
    },
    {
      id: 5,
      question: "Parollar, API kalitlari kabi maxfiy ma'lumotlar K8s da qayerda saqlanadi?",
      options: ["ConfigMap", "Volume", "Secret", "Deployment"],
      correctAnswer: 2,
      explanation: "Secret - bu Base64 da kodlangan maxfiy ma'lumotlarni xavfsizroq saqlash mexanizmi."
    },
    {
      id: 6,
      question: "Tashqi (internet) trafigini klaster ichidagi xizmatlarga yo'naltiruvchi resurs nima?",
      options: ["Ingress", "Egress", "NodePort", "PodPort"],
      correctAnswer: 0,
      explanation: "Ingress HTTP/HTTPS trafigini URL yo'llariga qarab klasterning turli Service'lariga yo'naltiradi."
    },
    {
      id: 7,
      question: "K8s klasterida ishlaydigan har bir kompyuter (server) nima deb ataladi?",
      options: ["Pod", "Container", "Node", "Master"],
      correctAnswer: 2,
      explanation: "Klaster Node'lar to'plamidan iborat bo'lib, har bir Node'da Pod'lar ishga tushadi."
    },
    {
      id: 8,
      question: "Klaster boshqaruvini qaysi komponent amalga oshiradi?",
      options: ["Worker Node", "Control Plane (Master Node)", "Kubelet", "Kube-proxy"],
      correctAnswer: 1,
      explanation: "Control Plane klasterning miyasi bo'lib, jadvallash (scheduling) va holatni boshqaradi."
    },
    {
      id: 9,
      question: "Pod ishlashiga kerak bo'lgan oddiy o'zgaruvchilarni (masalan, rang, limit) qayerda saqlaymiz?",
      options: ["Secret", "ConfigMap", "Ingress", "StorageClass"],
      correctAnswer: 1,
      explanation: "ConfigMap orqali oddiy konfiguratsiya ma'lumotlari konteynerlarga yetkaziladi."
    },
    {
      id: 10,
      question: "Pod'larni ma'lum bir Node'ga bog'lash uchun nima ishlatiladi?",
      options: ["nodeSelector / nodeAffinity", "PodLink", "NodeBind", "Replicas"],
      correctAnswer: 0,
      explanation: "Bular yordamida pod faqatgina biz xohlagan, masalan SSD diskli node'ga tushishi ta'minlanadi."
    },
    {
      id: 11,
      question: "HPA (Horizontal Pod Autoscaler) nima qiladi?",
      options: ["Podlarni vertikaliga (CPU/RAM) oshiradi", "Podlarni sayt yuklamasiga (masalan CPU) qarab sonini avtomat oshiradi yoki kamaytiradi", "Fayllarni siqadi", "Tarmoq tezligini oshiradi"],
      correctAnswer: 1,
      explanation: "HPA replicalar sonini avtomat o'zgartiradi."
    },
    {
      id: 12,
      question: "Kubernetes YAML faylidagi `kind` maydoni nima bildiradi?",
      options: ["Konteyner rasmi nomini", "Fayl yaratilgan sanani", "K8s resursi turini (masalan, Pod, Service, Deployment)", "Parolni"],
      correctAnswer: 2,
      explanation: "`kind` K8s ga biz qanday turdagi obyekt yaratmoqchi ekanimizni aytadi."
    }
  ]
};
