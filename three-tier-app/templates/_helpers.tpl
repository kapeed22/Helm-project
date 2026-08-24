{{- define "three-tier.fullname" -}}
{{- printf "%s-%s" .Release.Name .Values.global.environment | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "three-tier.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/environment: {{ .Values.global.environment }}
{{- end -}}
