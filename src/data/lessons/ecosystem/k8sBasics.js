export const k8sBasics = {
  id: "k8s-basics",
  title: "Kubernetes (K8s) Asoslari",
  language: "javascript",
  theory: `## Part 1: Beginner Analogy. Tasavvur qiling, orkestr va dirijyor

Tasavvur qiling, siz orkestr dirijyorisiz. Orkestrda turli xil musiqachilar (konteynerlar) bor: skripkachilar, puflama cholg'ular va barabanchilar. Agar bitta musiqachi kasal bo'lib qolsa yoki charchasa, kuy buzilmasligi uchun darhol uning o'rniga boshqa musiqachi kelishi kerak. Katta konsertlarda qaysi musiqachi qayerda o'tirishi, qachon chalishni boshlashi va agar ulardan biri xato qilsa nima bo'lishini qo'lda kuzatib turish imkonsiz.

**Kubernetes (K8s)** — xuddi shu mukammal dirijyorga o'xshaydi. U dastur (konteyner)larning qayerda ishlashi kerakligini, ularga qancha resurs (CPU/RAM) kerakligini va agar biror qism ishdan chiqsa, uni avtomatik tarzda qayta ishga tushirishni nazorat qiladi. 

- **Orkestr musiqachilari** = Konteynerlar (Docker)
- **Dirijyor** = Kubernetes
- **Sahnadagi stullar to'plami** = Podlar

---

## Part 2: Deep Dive (Under the hood, Control Plane, etcd, Kubelet, Pods, Services)

Kubernetes asosan ikki yirik qismdan iborat: **Control Plane** (Boshqaruv markazi) va **Worker Nodes** (Ishchi tugunlar).

### 1. Control Plane (Miya)
Bu qism klaster holatini va barcha jarayonlarni nazorat qiladi.
- **API Server:** Kubernetes bilan muloqot qilish (masalan, \\\`kubectl\\\` orqali) uchun markaziy darvoza.
- **etcd:** Klasterning barcha ma'lumotlarini (qaysi pod qayerda ishlayapti, qanday konfiguratsiyalar bor) saqlaydigan yuqori ishonchli kalit-qiymat (key-value) bazasi.
- **Scheduler:** Yangi Pod yaratilganda, uni bo'sh resursi bor eng maqbul Worker Node'ga joylashtiradi.
- **Controller Manager:** Klasterning kerakli holatda (desired state) ishlashini ta'minlaydi. Masalan, agar sizga 3 ta pod kerak bo'lsa va biri o'lib qolsa, Controller darhol yangisini yaratadi.

### 2. Worker Nodes (Mushaklar)
Haqiqiy ilovalar (konteynerlar) ishlaydigan joy.
- **Kubelet:** Har bir node'da ishlaydigan agent. U Control Plane'dan kelgan buyruqlarni bajaradi va konteynerlarning to'g'ri ishlashini nazorat qiladi.
- **Kube-Proxy:** Tarmoq qoidalari va xizmatlarni (Service) boshqaradi.
- **Container Runtime:** Konteynerlarni ishga tushiruvchi dastur (masalan, containerd, Docker).

### 3. Asosiy Obyektlar
- **Pod:** Kubernetes'dagi eng kichik birlik. Odatda 1 ta Pod ichida 1 ta konteyner ishlaydi. Podlar doimiy emas (ephemeral), agar node o'chib qolsa, pod ham o'ladi.
- **Deployment:** Podlarning qanday ishlashi va qancha nusxada (replicas) bo'lishini belgilaydi. Agar pod qulasa, Deployment uni qayta tiklaydi.
- **Service:** Podlarning IP manzillari doim o'zgarib turadi. Service esa ularga bitta o'zgarmas IP va DNS nom beradi, bu orqali tarmoq trafigi to'g'ri yo'naltiriladi.

---

## Part 3: Edge Cases va Senior Interview Questions

Katta tizimlarda Kubernetes o'zining murakkabliklariga ega. Quyida Senior darajadagi bilim talab qiluvchi savollar va kutilmagan holatlar (edge cases).

**1. OOMKilled holati (Out of Memory) nima va qanday hal qilinadi?**
Pod o'ziga ajratilgan xotiradan (Memory Limit) ko'p resurs talab qilsa, K8s uni o'ldiradi (OOMKilled).
*Yechim:* Pod'ning YAML faylida \\\`resources.requests\\\` va \\\`resources.limits\\\` qiymatlarini to'g'ri belgilash, xotiradan to'g'ri foydalanayotganini tekshirish uchun profiler ishlatish.

**2. Nima uchun Pod holati "CrashLoopBackOff" ga aylanadi?**
Pod ichidagi dastur xato bilan yopilmoqda (masalan xato port, ulanish xatosi, yoki kodda exception). K8s uni tinimsiz qayta ishga tushirishga urinadi va har safar kutish vaqtini oshiradi.
*Yechim:* \\\`kubectl logs <pod-name>\\\` orqali xatolikni o'qish va kod/konfiguratsiyani to'g'rilash.

**3. Liveness va Readiness probalarining farqi nimada?**
- **Liveness Probe:** "Bu dastur tirikmi?" deb tekshiradi. Agar proba o'tmasa, K8s pod'ni o'ldirib, qayta yaratadi. (Masalan, dastur deadlock'ga tushib qolsa)
- **Readiness Probe:** "Bu dastur foydalanuvchi trafigini qabul qilishga tayyormi?" deb tekshiradi. Agar o'tmasa, Service orqali unga trafik yuborishni to'xtatadi, lekin pod'ni o'ldirmaydi. (Masalan, DB bilan ulanishni kutayotgan bo'lsa)

**4. Tarmoqdagi Split-Brain muammosi qanday hal qilinadi?**
etcd o'z-o'zini barqaror saqlashi uchun har doim toq sonli (masalan, 3, 5, 7) node'larda ishlashi tavsiya etiladi (Raft consensus algoritmi). Agar split-brain bo'lsa, etcd klaster faoliyatini to'xtatib qo'yishi mumkin.

---

## 🏗️ K8s Arxitekturasi (Mermaid Diagram)

\\\`\\\`\\\`mermaid
graph TD;
    subgraph Control_Plane[Control Plane]
        API[API Server]
        ETCD[etcd Database]
        SCHED[Scheduler]
        CM[Controller Manager]
        
        API --- ETCD
        API --- SCHED
        API --- CM
    end

    subgraph Worker_Node_1[Worker Node 1]
        K1[Kubelet]
        P1[Pod 1]
        P2[Pod 2]
    end

    subgraph Worker_Node_2[Worker Node 2]
        K2[Kubelet]
        P3[Pod 3]
    end

    API <-->|Buyruqlar| K1
    API <-->|Buyruqlar| K2
\\\`\\\`\\\`
`,
  exercises: [
    {
      id: 1,
      title: "Replicas hisoblash",
      instruction: "\`getTotalReplicas\` funksiyasi deploymentlar obyektlari massivini qabul qiladi. Jami replicas sonini qaytaring.",
      startingCode: "function getTotalReplicas(deployments) {\n  // your code here\n}",
      hint: "reduce yoki loop ishlating, d.spec.replicas ni qo'shing",
      solution: "function getTotalReplicas(deployments) {\n  return deployments.reduce((sum, d) => sum + d.spec.replicas, 0);\n}",
      test: "const fn = new Function(code + '; return getTotalReplicas;')(); const r = fn([{spec:{replicas:2}}, {spec:{replicas:3}}]); if(r !== 5) throw new Error('Xato hisoblash');"
    },
    {
      id: 2,
      title: "Pod yaratuvchi funksiya",
      instruction: "\`createPod\` funksiyasi nom va image qabul qilib K8s pod obyekti strukturasini qaytarsin.",
      startingCode: "function createPod(name, image) {\n  return {\n    kind: 'Pod',\n    metadata: { name: name },\n    // spec va containers ni to'ldiring\n  };\n}",
      hint: "spec: { containers: [{ name, image }] }",
      solution: "function createPod(name, image) {\n  return { kind: 'Pod', metadata: { name }, spec: { containers: [{ name, image }] } };\n}",
      test: "const fn = new Function(code + '; return createPod;')(); const r = fn('app', 'nginx'); if(r.spec.containers[0].image !== 'nginx') throw new Error('Xato obyekt');"
    },
    {
      id: 3,
      title: "Label qo'shish",
      instruction: "\`addLabel\` funksiyasi K8s manifest (obyekt) va label obyektini (masalan { env: 'prod' }) qabul qilib, uni \`metadata.labels\` ichiga qo'shib qaytarsin.",
      startingCode: "function addLabel(manifest, label) {\n  // your code here\n}",
      hint: "manifest.metadata.labels = { ...manifest.metadata.labels, ...label }",
      solution: "function addLabel(manifest, label) {\n  if(!manifest.metadata.labels) manifest.metadata.labels = {};\n  manifest.metadata.labels = { ...manifest.metadata.labels, ...label };\n  return manifest;\n}",
      test: "const fn = new Function(code + '; return addLabel;')(); const r = fn({metadata:{}}, {tier:'frontend'}); if(r.metadata.labels.tier !== 'frontend') throw new Error('Label qoshilmadi');"
    },
    {
      id: 4,
      title: "Deployment Scale",
      instruction: "\`scaleDeployment\` funksiyasi deployment obyektini va yangi replica sonini qabul qilib, \`spec.replicas\` qiymatini o'zgartirsin va obyektni qaytarsin.",
      startingCode: "function scaleDeployment(deployment, replicas) {\n  // your code here\n}",
      hint: "deployment.spec.replicas = replicas;",
      solution: "function scaleDeployment(deployment, replicas) {\n  deployment.spec.replicas = replicas;\n  return deployment;\n}",
      test: "const fn = new Function(code + '; return scaleDeployment;')(); const r = fn({spec:{replicas:1}}, 5); if(r.spec.replicas !== 5) throw new Error('Scale ishlamadi');"
    },
    {
      id: 5,
      title: "Service obyekti",
      instruction: "\`createService\` app nomi va port qabul qilib, K8s Service obyektini qaytarsin.",
      startingCode: "function createService(app, port) {\n  // return { kind: 'Service', spec: { selector: { app }, ports: [{ port }] } }\n}",
      hint: "Izohdagi strukturani qaytaring",
      solution: "function createService(app, port) {\n  return { kind: 'Service', spec: { selector: { app }, ports: [{ port }] } };\n}",
      test: "const fn = new Function(code + '; return createService;')(); const r = fn('web', 80); if(r.spec.selector.app !== 'web' || r.spec.ports[0].port !== 80) throw new Error('Xato Service');"
    },
    {
      id: 6,
      title: "Pod statusini tekshirish",
      instruction: "\`isPodRunning\` funksiyasi pod obyekti (pod.status.phase) 'Running' bo'lsa true, aks holda false qaytarsin.",
      startingCode: "function isPodRunning(pod) {\n  // your code here\n}",
      hint: "return pod.status.phase === 'Running'",
      solution: "function isPodRunning(pod) {\n  return pod.status?.phase === 'Running';\n}",
      test: "const fn = new Function(code + '; return isPodRunning;')(); if(!fn({status:{phase:'Running'}}) || fn({status:{phase:'Pending'}})) throw new Error('Status tekshiruvi xato');"
    },
    {
      id: 7,
      title: "Image yangilash (Update)",
      instruction: "\`updateImage\` deployment obyekti va yangi image nomini olib, birinchi konteynerning imageni yangilasin.",
      startingCode: "function updateImage(deployment, newImage) {\n  // deployment.spec.template.spec.containers[0].image = newImage;\n}",
      hint: "Ichki obyekt yo'liga e'tibor bering.",
      solution: "function updateImage(deployment, newImage) {\n  deployment.spec.template.spec.containers[0].image = newImage;\n  return deployment;\n}",
      test: "const fn = new Function(code + '; return updateImage;')(); const r = fn({spec:{template:{spec:{containers:[{image:'v1'}]}}}}, 'v2'); if(r.spec.template.spec.containers[0].image !== 'v2') throw new Error('Image yangilanmadi');"
    },
    {
      id: 8,
      title: "Namespace ajratish",
      instruction: "\`getNamespace\` funksiyasi obyektni olib \`metadata.namespace\` ni qaytarsin. Agar yo'q bo'lsa 'default' qaytarsin.",
      startingCode: "function getNamespace(manifest) {\n  // your code here\n}",
      hint: "manifest.metadata.namespace || 'default'",
      solution: "function getNamespace(manifest) {\n  return manifest.metadata?.namespace || 'default';\n}",
      test: "const fn = new Function(code + '; return getNamespace;')(); if(fn({metadata:{}}) !== 'default' || fn({metadata:{namespace:'dev'}}) !== 'dev') throw new Error('Xato namespace');"
    },
    {
      id: 9,
      title: "ConfigMap Obyekti",
      instruction: "\`createConfigMap\` name va data obyektini qabul qilib, K8s ConfigMap qaytarsin.",
      startingCode: "function createConfigMap(name, data) {\n  // return { kind: 'ConfigMap', metadata: { name }, data }\n}",
      hint: "Faqat obyekt qaytarasiz.",
      solution: "function createConfigMap(name, data) {\n  return { kind: 'ConfigMap', metadata: { name }, data };\n}",
      test: "const fn = new Function(code + '; return createConfigMap;')(); const r = fn('app-conf', { key: 'val' }); if(r.kind !== 'ConfigMap' || r.data.key !== 'val') throw new Error('ConfigMap xato');"
    },
    {
      id: 10,
      title: "Resource limits",
      instruction: "\`setMemoryLimit\` pod.spec.containers[0] ichida resources.limits.memory ni belgilab qaytarsin.",
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
      question: "Kubernetes YAML faylidagi \`kind\` maydoni nima bildiradi?",
      options: ["Konteyner rasmi nomini", "Fayl yaratilgan sanani", "K8s resursi turini (masalan, Pod, Service, Deployment)", "Parolni"],
      correctAnswer: 2,
      explanation: "\`kind\` K8s ga biz qanday turdagi obyekt yaratmoqchi ekanimizni aytadi."
    }
  ]
};
